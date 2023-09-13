interface CApi {
  name: string
  title: string
  description: string
  attrs?: CAttribute[]
}

type CAttributeType =
  | 'string'
  | 'boolean'
  | 'icon'

interface CAttribute {
  title: string
  name: string
  type: CAttributeType
  options: {
    title: string
    value: any
  }[]
  default: any
  description: string
}

declare module '*.yaml' {
  const data: CApi[];
  export default data;
}