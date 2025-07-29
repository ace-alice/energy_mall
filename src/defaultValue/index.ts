import type { MediaQueryInfo, RegisterData } from '@/interface/common'

export const defaultMediaQueryInfo: MediaQueryInfo = {
  height: 815,
  width: 375,
  top: 0,
  bottom: 0
}

export const defaultRegisterData: RegisterData = {
  RSBSA: '',
  firstName: '',
  middleName: '',
  lastName: '',
  suffixName: '',
  gender: '',
  dateOfBirth: '',
  farmerClassification: '',
  association: '',
  activity: '',
  barangayId: undefined,
  cityId: undefined,
  street: '',
  provinceId: undefined,
}
