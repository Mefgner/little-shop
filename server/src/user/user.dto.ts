type MinimalUser = {
  id: number
  name: string
  password: string
  email: string
}

type UserDto = MinimalUser & {
  phone: string
  priviliges: 'user' | 'vip' | 'admin'
  deliveryAddress: string
  deliveryCity: string
  deliveryZipCode: string
  deliveryCountry: string
  created_at: Date
  updated_at: Date
}

export type { UserDto, MinimalUser as IMinimalUser }
