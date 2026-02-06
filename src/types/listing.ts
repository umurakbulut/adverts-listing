export interface IListingItem {
  id: number
  title: string
  location: ILocation
  category: ICategory
  modelName: string
  price: number
  priceFormatted: string
  date: string
  dateFormatted: string
  properties: IVehicleProperty[]
  userInfo: IUserInfo
  photo: string
  photos?: string[]
  text?: string
}

export interface ILocation {
  cityName: string
  townName: string
}

export interface ICategory {
  id: number
  name: string
}

export interface IVehicleProperty {
  name: string
  value: string
}

export interface IUserInfo {
  id: number
  nameSurname: string
  phone: string
  phoneFormatted: string
}
