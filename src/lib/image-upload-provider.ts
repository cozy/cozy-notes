import { ImageUploadProvider } from '@atlaskit/editor-common/dist/types/provider-factory'
import { ElementType, Errors, EventType, InputType } from 'constants/strings'
import { processFile } from 'lib/utils/process-file'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import { isCozyStackError } from 'types/guards'
import { TOASTER_DURATION } from 'constants/interface'

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

export const imageUploadProvider = (
  collabProvider: CollabProvider,
  t: (error: string) => string
): Promise<ImageUploadProvider> =>
  Promise.resolve<ImageUploadProvider>((_event, insertImageFn) => {
    const inputElement = document.createElement(ElementType.Input)

    inputElement.setAttribute('accept', 'image/*')

    inputElement.type = InputType.File

    inputElement.dispatchEvent(new MouseEvent(EventType.Click))

    inputElement.addEventListener(EventType.Change, () => {
      const reader = new window.FileReader()
      const file = inputElement.files?.[0]

      if (!file) throw Error(Errors.NoFileFoundAfterInput)

      reader.readAsArrayBuffer(file)

      reader.onloadend = async (): Promise<void> => {
        const processedFile = processFile(reader.result)

        if (!processedFile) throw Error(Errors.FileNotProcessable)

        try {
          const {
            data: { id: src }
          } = await collabProvider.serviceClient.postImage(
            file.name,
            collabProvider.config.noteId,
            processedFile,
            file.type
          )

          insertImageFn({ src })
        } catch (error) {
          Alerter.error(
            t(
              isCozyStackError(error)
                ? `Error.${error.status}`
                : 'Error.unknown_error'
            ),
            { duration: TOASTER_DURATION }
          )
        }
      }
    })
  })
