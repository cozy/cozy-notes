import FullPage from '../ui/Appearance/FullPage';
import Chromeless from '../ui/Appearance/Chromeless';
import Comment from '../ui/Appearance/Comment';
import Mobile from '../ui/Appearance/Mobile';
export default function getUiComponent(appearance) {
  appearance = appearance || 'comment';

  switch (appearance) {
    case 'full-page':
    case 'full-width':
      return FullPage;

    case 'chromeless':
      return Chromeless;

    case 'comment':
      return Comment;

    case 'mobile':
      return Mobile;

    default:
      throw new Error(`Appearance '${appearance}' is not supported by the editor.`);
  }
}