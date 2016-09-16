// Type definitions for urllib

declare module "urllib" {

  export interface Response {
    status: number
    data: string
  }

  export function request(
    url: string,
    options?:{
      method?: string,
      contentType?: string,
      data: any
    }
  ): Promise<Response>
}
