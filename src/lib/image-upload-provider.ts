import { TOASTER_DURATION } from 'constants/interface'
import { ElementType, Errors, EventType, InputType } from 'constants/strings'

import { ImageUploadProvider } from '@atlaskit/editor-common/dist/types/provider-factory'
import { processFile } from 'lib/helpers'
import { isCozyStackError } from 'types/guards'

import { InsertedImageProperties } from 'cozy-editor-core/src/plugins/image-upload/types'
import Alerter from 'cozy-ui/transpiled/react/deprecated/Alerter'

interface CollabProvider {
  config: {
    noteId: string
  }
  serviceClient: {
    postImage: (
      name: string,
      noteId: string,
      file: ArrayBuffer,
      type: string
    ) => Promise<{ data: { id: string } }>
  }
}

interface ImageUploadProviderConfig {
  collabProvider: CollabProvider
  t: (error: string) => string
  setUploading: (set: boolean) => void
}

type FileCallback = (file?: File) => void

export const imageUploadProvider = (
  config: ImageUploadProviderConfig
): Promise<ImageUploadProvider> =>
  Promise.resolve<ImageUploadProvider>((event, insertImageFn) =>
    handleEvent(event, file => uploadImage(config, insertImageFn, file))
  )

const handleEvent = (
  event: Event | undefined,
  cb: FileCallback
): void | boolean => {
  switch (event?.type) {
    case EventType.Drop:
      return handleDrop(event as DragEvent, cb)
    case EventType.Paste:
      return handlePaste(event as ClipboardEvent, cb)
    default:
      return handleClick(cb)
  }
}

const handleClick = (cb: FileCallback): void => {
  const inputElement = document.createElement(ElementType.Input)

  inputElement.setAttribute('accept', 'image/*')

  inputElement.type = InputType.File

  inputElement.dispatchEvent(new MouseEvent(EventType.Click))

  inputElement.addEventListener(EventType.Change, () =>
    cb(inputElement.files?.[0])
  )
}

const isSingle = (fileList?: FileList): boolean | void =>
  fileList?.length === 1 || (Alerter.error('Error.only_one_image'), false)

const handleDrop = (
  { dataTransfer }: DragEvent,
  cb: FileCallback
): boolean | void =>
  isSingle(dataTransfer?.files) && cb(dataTransfer?.files?.[0])

const handlePaste = (
  { clipboardData }: ClipboardEvent,
  cb: FileCallback
): void => cb(clipboardData?.files?.[0])

const uploadImage = (
  config: ImageUploadProviderConfig,
  insertImageFn: (props: InsertedImageProperties) => void,
  file?: File
): void => {
  const reader = new window.FileReader()

  if (!file) throw Error(Errors.NoFileFoundAfterInput)

  reader.readAsArrayBuffer(file)

  reader.onloadend = async (): Promise<void> => {
    const processedFile = processFile(reader.result)

    if (!processedFile) throw Error(Errors.FileNotProcessable)

    try {
      config.setUploading(true)

      const {
        data: { id: src }
      } = await config.collabProvider.serviceClient.postImage(
        file.name,
        config.collabProvider.config.noteId,
        processedFile,
        file.type
      )

      insertImageFn({ src })
    } catch (error) {
      Alerter.error(
        config.t(
          isCozyStackError(error)
            ? `Error.${error.status}`
            : 'Error.unknown_error'
        ),
        { duration: TOASTER_DURATION }
      )
    } finally {
      config.setUploading(false)
    }
  }
}
