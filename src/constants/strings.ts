export enum Errors {
  NoFileFoundAfterInput = 'No File was detected during the upload procedure.',
  FileNotProcessable = 'Could not process the uploaded image.',
  CouldNotFindFileInCurrentNote = 'Could not find file in current note.',
  MissingCollabEdit = '`CollabEditProvider` was `undefined` in `fetchCozyImage`. <Media> was unable to fetch the image source. The component might be unmounted.',
  CouldNotGetNoteImages = 'MediaNode failed to fetch included files in the current note'
}

export enum ElementType {
  Input = 'input'
}

export enum InputType {
  File = 'file'
}

export enum EventType {
  Click = 'click',
  Change = 'change',
  Drop = 'drop'
}

export enum RealTimeEvent {
  Created = 'CREATED',
  Updated = 'UPDATED'
}

export enum CozyDoctypes {
  Files = 'io.cozy.files',
  NoteEvents = 'io.cozy.notes.events',
  Thumbnails = 'io.cozy.files.thumbnails'
}

export enum Slugs {
  Drive = 'drive'
}

export const SHARING_LOCATION = '/preview'
