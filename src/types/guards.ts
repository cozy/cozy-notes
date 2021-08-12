import { CozyStackError } from './errors'

export function isCozyStackError(
  error: CozyStackError | unknown
): error is CozyStackError {
  return (error as CozyStackError).status !== undefined
}
