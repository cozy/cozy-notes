export interface CozyStackError {
  status: number
  title: string
  detail: string
  source: { parameter: string }
}
