import styled, { css } from 'styled-components';
import { borderRadius } from '@atlaskit/theme/constants';
import { N0 } from '@atlaskit/theme/colors';
import { dropShadow } from '../styles';
export const Container = styled.div`
  border-radius: ${borderRadius()}px;
  ${dropShadow} display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 4px 8px;
  background-color: ${N0};
  ${({
  height
}) => height ? css`
          height: ${height}px;
        ` : ''};
`;