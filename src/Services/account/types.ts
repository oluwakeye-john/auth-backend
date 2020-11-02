export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface RefreshPayload {
  email: string
  refresh_token: string
}
