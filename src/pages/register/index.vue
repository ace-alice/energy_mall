<script setup name="Register" lang="ts">
import { defaultRegisterData } from '@/defaultValue'
import type { RegisterData } from '@/interface/common'
import { getLocal, setLocal } from '@/utils/storage'
import dayjs from 'dayjs'
import { type PickerInstance } from 'vant'
import calendarIcon from '@/assets/images/common/calendar-03.png'
import { getProvinces, getCitiesById, getBarangayById } from '@/api/location'

const route = useRoute()
const router = useRouter()
const isFinder = route.name == 'Finder'
const titleName = isFinder ? 'RSBSA Finder' : 'Register'
const RSBSApattern = /^\d{2}-\d{2}-\d{3}-\d{6}$/
const namePattern = /[a-zA-Z]/

const formData = reactive<RegisterData>(Object.assign({}, defaultRegisterData))

const classificationSelects = ref([])

const classificationSelectValue = ref('')

// 添加格式化后的日期显示
const formattedDateOfBirth = computed(() => {
  if (!formData.dateOfBirth) return ''
  return dayjs(formData.dateOfBirth).format('MMM D, YYYY')
})

// 校验函数返回 true 表示校验通过，false 表示不通过
const nameOptionsValidator = (val: any) => namePattern.test(val) || !val

const onFailed = (errorInfo: any) => {
  console.log('failed', errorInfo)
}

const onDateOfBirthConfirm = (date: Date) => {
  formData.dateOfBirth = dayjs(date).format('YYYY-MM-DD')
  console.log(formData.dateOfBirth)
  showCalendar.value = false
}

const showCalendar = ref(false)
const showClassification = ref(false)
const classificationPickerRef = ref<PickerInstance>()
const showAssociation = ref(false)
const associationPickerRef = ref<PickerInstance>()

const showProvinces = ref(false)
const provincesPickerRef = ref<PickerInstance>()

const showCities = ref(false)
const citiesPickerRef = ref<PickerInstance>()

const showBarangay = ref(false)
const barangayPickerRef = ref<PickerInstance>()


const provinceColumns = ref([])

const cityColumns = ref([])

const barangayColumns = ref([])

const currentProvince = computed(() => {
  const temp: any = provinceColumns.value.find((item: any) => item.value == formData.provinceId)
  return temp ? temp.text : ''
})

const currentCity = computed(() => {
  const temp: any = cityColumns.value.find((item: any) => item.value == formData.cityId)
  return temp ? temp.text : ''
})

const currentBarangay = computed(() => {
  const temp: any = barangayColumns.value.find((item: any) => item.value == formData.barangayId)
  return temp ? temp.text : ''
})

const onProvinceConfirm = ({ selectedValues, selectedOptions }: any) => {
  formData.provinceId = selectedValues.join(',');
  formData.provinceName = selectedOptions[0].text;
  showProvinces.value = false;
  initCity();
  initBarangay();
}

const onCityConfirm = ({ selectedValues, selectedOptions }: any) => {
  formData.cityId = selectedValues.join(',');
  formData.cityName = selectedOptions[0].text;
  showCities.value = false;
  initBarangay();
}

const onBarangayConfirm = ({ selectedValues, selectedOptions }: any) => {
  formData.barangayId = selectedValues.join(',')
  formData.barangayName = selectedOptions[0].text
  showBarangay.value = false
}


const classificationColumns = [
  {
    text: 'Farmer',
    value: 'Farmer',
    children: [
      { text: 'Rice', value: 'Rice' },
      { text: 'Corn', value: 'Corn' }
    ]
  },
  {
    text: 'Farmworker/Laborer',
    value: 'FarmworkerOrLaborer',
    children: [
      { text: 'Planting', value: 'Planting' },
      { text: 'Planting/Transplanting', value: 'PlantingOrTransplanting' },
      { text: 'Cultivation', value: 'Cultivation' },
      { text: 'Harvesting', value: 'Harvesting' }
    ]
  },
  {
    text: 'Fisherfolk',
    value: 'Fisherfolk',
    children: [
      { text: 'Fish Capture', value: 'FishCapture' },
      { text: 'Aquaculture', value: 'Aquaculture' },
      { text: 'Gleaning', value: 'Gleaning' },
      { text: 'Fish Processing', value: 'FishProcessing' },
      { text: 'Fish Vending', value: 'FishVending' }
    ]
  }
]

const associationColumns = [{ text: 'None', value: 'None' }]

const onClassificationConfirm = ({ selectedValues }: any) => {
  if (selectedValues.length == 2) {
    classificationSelects.value = selectedValues
    formData.farmerClassification = selectedValues[0]
    formData.activity = selectedValues[1]
    classificationSelectValue.value = `${formData.farmerClassification} | ${formData.activity}`
  } else {
    classificationSelects.value = []
  }
  showClassification.value = false
}

const onAssociationConfirm = ({ selectedValues }: any) => {
  formData.association = selectedValues.join(',')
  showAssociation.value = false
}

function toRegister() {
  setLocal('registerInfo', formData)
  router.push({ name: 'SelfieTaken' })
  // router.push({ name: 'Personal',query:{type:'view'} })
}

function getProvinceList() {
  getProvinces().then(res => {
    provinceColumns.value = res.data.map((item: { provinceId: number, provinceName: string }) => {
      return {
        text: item.provinceName, value: item.provinceId
      }
    })
  })
}

function getCityList() {
  if (formData.provinceId) {
    getCitiesById(formData.provinceId).then(res => {
      cityColumns.value = res.data.map((item: { municipalityId: number, municipalityName: string }) => {
        return {
          text: item.municipalityName, value: item.municipalityId
        }
      })
    })
  }
}

function getBarangayList() {
  if (formData.cityId) {
    getBarangayById(formData.cityId).then(res => {
      barangayColumns.value = res.data.map((item: { barangayId: number, barangayName: string }) => {
        return {
          text: item.barangayName, value: item.barangayId
        }
      })
    })
  }
}

function initCity() {
  formData.cityId = undefined
  cityColumns.value = []
  getCityList()
}
function initBarangay() {
  formData.barangayId = undefined
  barangayColumns.value = []
  getBarangayList()
}

onMounted(() => {
  const cacheData = getLocal('registerInfo')
  if (cacheData) {
    Object.assign(formData, cacheData)
    if (formData.activity && formData.farmerClassification) {
      classificationSelectValue.value = `${formData.farmerClassification} | ${formData.activity}`
    }
  }
  getProvinceList()
  if (formData.provinceId) {
    getCityList()
  }
  if (formData.cityId) {
    getBarangayList()
  }
})
</script>

<template>
  <div class="register">
    <NormalHeader :title="titleName" />
    <div class="register-box">
      <van-form @failed="onFailed" @submit="toRegister" label-align="top" required>
        <div class="form-content">
          <template v-if="isFinder">
            <div class="form-item">
              <div class="form-label">RSBSA Number</div>
              <van-field v-model="formData.RSBSA" name="RSBSA" placeholder="00-00-000-000000" :rules="[
                { pattern: RSBSApattern, message: 'Please enter the correct RSBSA number' }
              ]" />
            </div>
          </template>
          <div class="form-item">
            <div class="form-label">First Name<span class="required">*</span></div>
            <van-field v-model="formData.firstName" name="firstName" placeholder="Enter your first name"
              :rules="[{ pattern: namePattern, message: 'Please enter the correct name' }]" />
          </div>
          <div class="form-item">
            <div class="form-label">Middle Name <i class="optional">(optional)</i></div>
            <van-field v-model="formData.middleName" placeholder="Enter your middle name" :required="false" :rules="[
              { validator: nameOptionsValidator, message: 'Please enter the correct name' }
            ]" />
          </div>
          <div class="form-item">
            <div class="form-label">Last Name<span class="required">*</span></div>
            <van-field v-model="formData.lastName" name="lastName" placeholder="Enter your last name"
              :rules="[{ pattern: namePattern, message: 'Please enter the correct name' }]" />
          </div>
          <div class="form-item">
            <div class="form-label">Suffix Name <i class="optional">(optional)</i></div>
            <van-field v-model="formData.suffixName" placeholder="Enter your suffix name" :required="false" :rules="[
              { validator: nameOptionsValidator, message: 'Please enter the correct name' }
            ]" />
          </div>
          <div class="form-item">
            <div class="form-label">Gender<span class="required">*</span></div>
            <van-field class="custom-radio-group" name="gender" :model-value="formData.gender" label=""
              :rules="[{ required: true, message: 'Please select gender' }]">
              <template #input>
                <div class="gender-group">
                  <div class="gender-option" :class="{ active: formData.gender === 'Male' }"
                    @click="formData.gender = 'Male'">
                    Male
                  </div>
                  <div class="gender-option" :class="{ active: formData.gender === 'Female' }"
                    @click="formData.gender = 'Female'">
                    Female
                  </div>
                </div>
              </template>
            </van-field>
          </div>
          <div class="form-item">
            <div class="form-label">Date of Birth<span class="required">*</span></div>
            <van-field v-model="formattedDateOfBirth" placeholder="Select date of birth" readonly name="dateOfBirth"
              right-icon="calendar-o" :rules="[{ required: true, message: 'Please select bate of birth' }]"
              @click="showCalendar = true">
              <template #right-icon>
                <van-image :src="calendarIcon" width="20" height="20" fit="contain" />
              </template>
            </van-field>
          </div>
          <div class="form-item">
            <div class="form-label">Farmer Classification<span class="required">*</span></div>
            <van-field name="farmerClassification" v-model="classificationSelectValue"
              placeholder="Select classification" readonly
              :rules="[{ required: true, message: 'Please select farmer classification' }]"
              @click="showClassification = true">
              <template #right-icon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L10 13L14 9" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </template>
            </van-field>
          </div>
          <div class="form-item">
            <div class="form-label">Association<span class="required">*</span></div>
            <van-field v-model="formData.association" name="association" placeholder="Select association" readonly
              :rules="[{ required: true, message: 'Please select association' }]" @click="showAssociation = true">
              <template #right-icon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L10 13L14 9" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </template>
            </van-field>
          </div>
          <div class="form-item">
            <div class="form-label">Province<span class="required">*</span></div>
            <van-field v-model="currentProvince" name="provinceId" placeholder="Select province" readonly
              @click="showProvinces = true" :rules="[{ required: true, message: 'Please select province' }]">
              <template #right-icon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L10 13L14 9" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </template>
            </van-field>
          </div>
          <div class="form-item" v-if="formData.provinceId">
            <div class="form-label">City<span class="required">*</span></div>
            <van-field v-model="currentCity" name="cityId" placeholder="Select city" readonly @click="showCities = true"
              :rules="[{ required: true, message: 'Please select city' }]">
              <template #right-icon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L10 13L14 9" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </template>
            </van-field>
          </div>
          <div class="form-item" v-if="formData.cityId">
            <div class="form-label">Barangay<span class="required">*</span></div>
            <van-field v-model="currentBarangay" name="barangayId" placeholder="Select barangay" readonly
              @click="showBarangay = true" :rules="[{ required: true, message: 'Please select barangay' }]">
              <template #right-icon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L10 13L14 9" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </template>
            </van-field>
          </div>
          <div class="form-item">
            <div class="form-label">Street <i class="optional">(optional)</i></div>
            <van-field v-model="formData.street" placeholder="Enter your street" :required="false" />
          </div>
        </div>
        <div class="submit-btn">
          <van-button round block type="primary" native-type="submit">Next</van-button>
        </div>
      </van-form>

      <van-calendar v-model:show="showCalendar" switch-mode="year-month" @confirm="onDateOfBirthConfirm" />
      <van-popup v-model:show="showClassification" destroy-on-close position="bottom" round>
        <van-picker ref="classificationPickerRef" :columns="classificationColumns" :model-value="classificationSelects"
          @confirm="onClassificationConfirm" @cancel="showClassification = false" title="Farmer Classification"
          confirm-button-text="">
          <template #cancel>
            <van-icon name="cross" size="20" color="#000" />
          </template>
          <template #columns-bottom>
            <div style="padding: 20px 20px 40px">
              <van-button type="primary" block round style="
                  --van-button-primary-background: #1e40af;
                  --van-button-primary-border-color: #1e40af;
                " @click="
                  () => {
                    classificationPickerRef?.confirm()
                  }
                ">Done</van-button>
            </div>
          </template>
        </van-picker>
      </van-popup>
      <van-popup v-model:show="showAssociation" destroy-on-close position="bottom" round>
        <van-picker ref="associationPickerRef" :columns="associationColumns" :model-value="[formData.association]"
          @confirm="onAssociationConfirm" @cancel="showAssociation = false" confirm-button-text="" title="Association">
          <template #cancel>
            <van-icon name="cross" size="20" color="#000" />
          </template>
          <template #columns-bottom>
            <div style="padding: 20px 20px 40px">
              <van-button type="primary" block round style="
                  --van-button-primary-background: #1e40af;
                  --van-button-primary-border-color: #1e40af;
                " @click="
                  () => {
                    associationPickerRef?.confirm()
                  }
                ">Done</van-button>
            </div>
          </template>
        </van-picker>
      </van-popup>
      <!-- 选择省份 -->
      <van-popup v-model:show="showProvinces" destroy-on-close position="bottom" round>
        <van-picker ref="provincesPickerRef" :columns="provinceColumns" :model-value="[formData.provinceId || '']"
          @confirm="onProvinceConfirm" @cancel="showProvinces = false" confirm-button-text="" title="Province">
          <template #cancel>
            <van-icon name="cross" size="20" color="#000" />
          </template>
          <template #columns-bottom>
            <div style="padding: 20px 20px 40px">
              <van-button type="primary" block round style="
                  --van-button-primary-background: #1e40af;
                  --van-button-primary-border-color: #1e40af;
                " @click="
                  () => {
                    provincesPickerRef?.confirm()
                  }
                ">Done</van-button>
            </div>
          </template>
        </van-picker>
      </van-popup>

      <!-- 选择城市 -->
      <van-popup v-model:show="showCities" destroy-on-close position="bottom" round>
        <van-picker ref="citiesPickerRef" :columns="cityColumns" :model-value="[formData.cityId || '']"
          @confirm="onCityConfirm" @cancel="showCities = false" confirm-button-text="" title="City"
          :rules="[{ required: true, message: 'Please select City' }]">
          <template #cancel>
            <van-icon name="cross" size="20" color="#000" />
          </template>
          <template #columns-bottom>
            <div style="padding: 20px 20px 40px">
              <van-button type="primary" block round style="
                  --van-button-primary-background: #1e40af;
                  --van-button-primary-border-color: #1e40af;
                " @click="
                  () => {
                    citiesPickerRef?.confirm()
                  }
                ">Done</van-button>
            </div>
          </template>
        </van-picker>
      </van-popup>

      <!-- 选择地区 -->
      <van-popup v-model:show="showBarangay" destroy-on-close position="bottom" round>
        <van-picker ref="barangayPickerRef" :columns="barangayColumns" :model-value="[formData.barangayId || '']"
          @confirm="onBarangayConfirm" @cancel="showBarangay = false" confirm-button-text="" title="Barangay">
          <template #cancel>
            <van-icon name="cross" size="20" color="#000" />
          </template>
          <template #columns-bottom>
            <div style="padding: 20px 20px 40px">
              <van-button type="primary" block round style="
                  --van-button-primary-background: #1e40af;
                  --van-button-primary-border-color: #1e40af;
                " @click="
                  () => {
                    barangayPickerRef?.confirm()
                  }
                ">Done</van-button>
            </div>
          </template>
        </van-picker>
      </van-popup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register {
  width: 100%;
  // height: 100%;
  // overflow: auto;
  background-color: #ffffff;

  .register-box {
    width: 100%;
    padding: 20px 16px;
    background-color: #f8fafc;
    box-sizing: border-box;

    .form-content {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-item {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .form-label {
        font-size: 14px;
        line-height: 20px;
        color: #374151;
        font-weight: 500;

        .required {
          color: #ef4444;
          margin-left: 4px;
        }

        .optional {
          color: #9ca3af;
          font-style: italic;
          font-weight: normal;
        }
      }

      :deep(.van-field) {
        padding: 0;
        background: transparent;

        &::after {
          display: none;
        }

        .van-field__value {
          .van-field__body {
            position: relative;
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;

            input {
              border: none;
              background: transparent;
              padding: 12px 16px;
              padding-right: 40px;
              font-size: 14px;
              line-height: 20px;
              color: #111827;

              &::placeholder {
                color: #9ca3af;
              }
            }

            .van-field__right-icon {
              position: absolute;
              right: 12px;
              top: 50%;
              transform: translateY(-50%);
              color: #9ca3af;
              font-size: 20px;
              height: 20px;
              display: flex;
              align-items: center;
            }
          }
        }
      }

      .gender-group {
        display: flex;
        gap: 12px;
        width: 100%;

        .gender-option {
          flex: 1;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          line-height: 20px;
          color: #374151;
          cursor: pointer;

          &.active {
            background: #eff6ff;
            border-color: #1e40af;
            color: #1e40af;
          }
        }
      }
    }

    .submit-btn {
      margin-top: 24px;

      :deep(.van-button) {
        height: 48px;
        font-size: 16px;
        font-weight: 500;
        background: var(--primary, linear-gradient(90deg, #0077e5 0%, #1e40af 100%));
        border-color: #1e40af;
      }
    }
  }
}

.custom-radio-group {
  :deep(.van-field__body) {
    border: none !important;
  }
}

:deep(.van-field--disabled) {
  .van-field__control {
    color: #9CA3AF;
  }

  .van-field__body {
    opacity: 0.7;
  }
}
</style>
