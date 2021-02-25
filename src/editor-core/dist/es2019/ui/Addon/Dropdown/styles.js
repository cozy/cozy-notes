import styled from 'styled-components';
import { borderRadius } from '@atlaskit/theme/constants';
import { N60A } from '@atlaskit/theme/colors';
export const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: ${borderRadius()}px;
  box-shadow: 0 4px 8px -2px ${N60A}, 0 0 1px ${N60A};
  box-sizing: border-box;
  padding: 4px 0;
`;