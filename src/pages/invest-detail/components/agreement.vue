<script setup lang="ts" name="Agreement">
import dayjs from 'dayjs'
import jia_z from '@/assets/images/common/jia_z.png'
import danbao_z from '@/assets/images/common/danbao_z.png'
import { useCommonStore } from '@/stores/common'
import type { InvestItemType } from '@/interface/common'
import { getProfitType, getCycleTime, incomeMath, rateMath } from '@/utils/common'

const currency = __VITE_CURRENCY

const { userInfo } = storeToRefs(useCommonStore())

const { info } = defineProps<{
  info: InvestItemType
}>()

const incomeMoney = computed(() => {
  return incomeMath(
    Number(info.invest),
    rateMath(info.profit_rate, userInfo.value.level_extra),
    getCycleTime(info.profit_cycle_time).value == 2
      ? 0
      : getCycleTime(info.profit_cycle_time).value == 3
        ? 2
        : 1,
    Number(info.profit_type) == 5,
    Number(info.profit_cycle)
  )
})
</script>
<template>
  <div class="agreement">
    <van-divider>产品协议</van-divider>
    <h3 style="text-align: center">Iberdrola(伊比德罗拉）新能源投资(中国)有限公司投资合同书</h3>
    <div class="box-1">
      <div>合同编号：HTXXXXXXXXXXXXXX</div>
      <div>甲方（管理方）：Iberdrola（伊比德罗拉）能源投资（中国）有限公司</div>
      <div>乙方（投资方）：{{ userInfo.sfz_name }} ({{ userInfo.sfz_number }})</div>
      <div>丙方（担保方）：劳合社保险股份有限公司</div>
    </div>
    <div class="box-base">
      基于各方的业务需求和责任，双方签订本合同完全是自愿的，并非强迫或欺骗。在本合同履行过程中，如需对本合同内容进行变更或补充，双方同意制作本合同理财明细。本合同附件是本合同不可分割的组成部分，与本合同具有同等法律效力。
      乙方通过由甲方运营管理的“Iberdrola（伊比德罗拉）能源投资（中国）有限公司”线上平台，进行对其公司运营操作的资产项目投资事宜，双方根据平等、自愿的原则，达成本协议如下:
    </div>
    <h4>一、收益金额、期限、返款方式</h4>
    <div class="box-base child-base">
      1.甲方同意通过“Iberdrola（伊比德罗拉）能源投资（中国）有限公司”线上平台接收乙方投资金额如下，乙方同意通过“Iberdrola（伊比德罗拉）能源投资（中国）有限公司‘’线上平台向甲方投资金额、收益、返款方式。
    </div>
    <h4>二、理财投资明细</h4>
    <div class="box-base">
      <van-grid column-num="2" :center="false">
        <van-grid-item style="flex-basis: 35%" text="产品名称" />
        <van-grid-item style="flex-basis: 65%" :text="info.title" />
        <van-grid-item style="flex-basis: 35%" text="投资人姓名" />
        <van-grid-item style="flex-basis: 65%" :text="userInfo.sfz_name" />
        <van-grid-item style="flex-basis: 35%" text="投资人身份证" />
        <van-grid-item style="flex-basis: 65%" :text="userInfo.sfz_number" />
        <van-grid-item style="flex-basis: 35%" text="投入本金数额" />
        <van-grid-item style="flex-basis: 65%" :text="`${info.invest.toString()} ${currency}`" />
        <van-grid-item style="flex-basis: 35%" text="协议期" />
        <van-grid-item
          style="flex-basis: 65%"
          :text="`${info.profit_cycle * getCycleTime(info.profit_cycle_time).value} ${getCycleTime(info.profit_cycle_time).label}`"
        />
        <van-grid-item style="flex-basis: 35%" text="预期收益率" />
        <van-grid-item
          style="flex-basis: 65%"
          :text="`${rateMath(info.profit_rate, userInfo.level_extra).toFixed(2)} %`"
        />
        <van-grid-item style="flex-basis: 35%" text="起息日" />
        <van-grid-item
          style="flex-basis: 65%"
          :text="`${dayjs().add(1, 'day').format('YYYY-MM-DD')}`"
        />
        <van-grid-item style="flex-basis: 35%" text="到期日" />
        <van-grid-item
          style="flex-basis: 65%"
          :text="`${dayjs().add(info.profit_cycle, 'day').format('YYYY-MM-DD')}`"
        />
        <van-grid-item style="flex-basis: 35%" text="应收本息" />
        <van-grid-item style="flex-basis: 65%" :text="incomeMoney.toFixed(2)" />
        <van-grid-item style="flex-basis: 35%" text="还款方式" />
        <van-grid-item
          style="flex-basis: 65%"
          :text="getProfitType(info.profit_type, info.profit_cycle_time)"
        />
      </van-grid>
    </div>
    <h4>三、投资流程</h4>
    <div class="box-base child-base">
      1.本协议成立：甲方首先在“Iberdrola（伊比德罗拉）能源投资（中国）有限公司‘’线上平台上发布相关的投资资产项目收益，乙方按照甲方的规则，通过在“Iberdrola（伊比德罗拉）能源投资（中国）有限公司”线上平台上相关的投资资产项目收益，按钮确认投资时，本协议下所约定的关系即成立，本协议的签署关系同时成立。
    </div>
    <div class="box-base child-base">
      2投资资金冻结：乙方点击“立即投资”按钮即视为其已经向甲方发出不可撤销的授权指令，授权甲方全权处理和操作本次的投资金额(“乙方'Iberdrola（伊比德罗拉）能源投资（中国）有限公司''线上平台账户”)中的冻结金额等同于本协议投资的本金数额的资金。上述冻结在本协议生效时或本协议确定失效时(项目周期结束)解除。
    </div>
    <div class="box-base child-base">
      3.投资资金变更：本协议生效的同时，甲方即不可撤销乙方所投资的金额，本金额等同于本协议第一条所列的“收益金额、期限、返款方式”。
    </div>
    <h4>四、投资资金来源保证</h4>
    <div class="box-base child-base">
      1.乙方保证其所用于投资资金来源合法，乙方是该资金的合法所有人，如果合法性问题(如盗用他人的银行卡，信用卡等)发生争议，由乙方自行负责解决。如乙方未能解决，因乙方资金安全问题导致账户被相关司法机关冻结或者执行，由乙方自行负责解决相关司法问题。
    </div>
    <h4>五、本息返还方式</h4>
    <div class="box-base child-base">
      1.甲方同意并承诺，乙方所投资金的收益金额、期限、返款方式的执行，甲方负责对乙方所投资金额的收益金额和返款时间的保证，甲方必须按照本协议的约定按时间全额的将其返还到乙方的帐户中。
    </div>
    <div class="box-base child-base">
      2.甲方应在每周期内或每日规定的返款时间(每日分红和到期返本金)(不得迟于24:00)将其按照本协议第一条所述的本息，转入乙方的账户。
    </div>
    <div class="box-base child-base">3.如果返款日遇到法定假日或公休日，返款日期时间不受影响。</div>
    <h4>六、违约</h4>
    <div class="box-base child-base">
      1.如果甲方严重违反本协议的协定，如:没能按时的返还乙方的红利及本金，甲方应向乙方支付投资总金额和投资总金额10%作为违约金。乙方须保证其资金来源的合法性不得隐瞒，否则甲方有权冻结其资金移送法办。
    </div>
    <div class="box-base child-base">
      2.乙方保证其提供的信息和资料的真实性，不得提供虚假资料或隐瞒。乙方提供虚假资料或者故意隐瞒，构成违约，应承担违约责任，同时本协议视为提前终止。
    </div>
    <div class="box-base child-base">
      3.发生下列任何一项或几项情形的，甲方、乙方任何财产遭受没收、征用、查封、扣押、冻结等可能影响其履约能力的不利事件，且不能及时提供有效补救措施的，提前终止本协议，采取法律、法规以及本协议约定的其他救济措施。
    </div>
    <h4>七、风险控制及承包责任</h4>
    <div class="box-base child-base">
      1.甲方对乙方投资资金负有控制风险的责任，必须勤勉尽责。如果投资有亏损情况，则无论亏损大小由甲方承担全部损失，按合同承诺支付给乙方，如果甲方出现违约将有承担机构方(丙方)履行承诺兑付义务。
    </div>
    <h4>八、保密义务</h4>
    <div class="box-base child-base">
      1.甲乙丙三方对其通过接触和通过其他渠道得知的有关各方的商业机密等应该严格保密，对所有项目资料严格保密，不得向任何其他人员及机构透露相关信息。
    </div>
    <h4>九、合同生效</h4>
    <div class="box-base child-base">1.本协议在下述条件全部满足时生效:</div>
    <div class="box-base child-base">
      (1)甲方、乙方、丙方在本协议(含传真件)上签字盖章、且乙方通过“Iberdrola（伊比德罗拉）能源投资（中国）有限公司”线上平台以网络在线点击：立即投资的方式签订;
    </div>
    <div class="box-base child-base">
      (2)自甲方发布的投资项目起，乙方所投项目资金全部在“Iberdrola（伊比德罗拉）能源投资（中国）有限公司”线上平台账户中本金将被冻结直至项目周期结束。
    </div>
    <div class="box-base child-base">
      2.本协议的任何修改、补充均须以“Iberdrola（伊比德罗拉）能源投资（中国）有限公司”线上平台电子文本形式作出。
    </div>
    <div class="box-base child-base">
      3.三方均确认，本协议的签订、生效和履行以不违反法律为前提。如果本协议中的任何一条或多条违反适用的法律，则该条将被视为无效，但该无效条款并不影响本协议其他条款的效力。
    </div>
    <div class="box-base child-base">
      4.如果双方在本协议履行过程中发生任何争议，应友好协商解决;如协商不成，任何一方有权向本方所在地的人民法院提起仲裁或诉讼。
    </div>
    <div class="box-base child-base">
      5.甲方保留与本协议有关的书面文件或电子信息。本协议采用电子文本形式制作，各方均认可该形式合同的法律效力。
    </div>
    <div class="box-base child-base">
      6.本协议一式三份，甲方一份，乙方一份，丙方一份，具有同等法律效力。
    </div>
    <h4>十、终止合作的条件</h4>
    <div class="box-base child-base">
      1.合作合同规定的期限届满;合作目的已达到;根据国家主管机构的决定;法律规定的其他情形。
    </div>
    <div class="box-2">
      <div>
        <div>甲方（管理方）：Iberdrola（伊比德罗拉）能源投资（中国）有限公司</div>
        <div style="text-align: end">{{ dayjs().format('YYYY-MM-DD') }}</div>
      </div>
      <div>
        <div>乙方（投资方）：{{ userInfo.sfz_name }} ({{ userInfo.sfz_number }})</div>
        <div style="text-align: end">{{ dayjs().format('YYYY-MM-DD') }}</div>
      </div>
      <div>
        <div>丙方（担保方）：劳合社保险股份有限公司</div>
        <div style="text-align: end">{{ dayjs().format('YYYY-MM-DD') }}</div>
      </div>
      <img :src="jia_z" class="img-z z-1" width="100" height="100" alt="" />
      <img :src="danbao_z" class="img-z z-2" width="100" height="100" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.img-z {
  position: absolute;
  right: 0;
}
.z-1 {
  top: -20px;
}
.z-2 {
  bottom: -20px;
}
.agreement {
  width: 100%;
  padding: 0 16px;
  line-height: 1.4;
}
.box-base {
  padding: 12px;
  font-size: 15px;
}
.child-base {
  font-size: 14px;
  color: #666;
}
.box-2 {
  font-size: 14px;
  margin-top: 20px;
  position: relative;
  & > div {
    margin-bottom: 60px;
  }
}
.box-1 {
  font-size: 14px;
  & > div {
    margin-top: 6px;
  }
}
</style>
