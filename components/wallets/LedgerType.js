import React from 'react';
import styled from 'styled-components';

import { Box, Button, Flex, Grid, Text } from '@makerdao/ui-components-core';
import LedgerConnectCard from './LedgerConnectCard';

import { BreakableText } from '../Typography';
import LedgerLogo from '../../assets/icons/ledger.svg';
import Cross from '../../assets/icons/cross.svg';

// hack to get around button padding for now
const StyledLedgerLogo = styled(LedgerLogo)`
  margin-top: -5px;
  margin-bottom: -5px;
`;

const LEDGER_LIVE_PATH = "44'/60'/0'";
const LEDGER_LEGACY_PATH = "44'/60'/0'/0";

function LedgerType({ onClose, onPathSelect }) {
  return (
    <Grid gridRowGap="m" px="m" py="s" width={['auto', '52rem']}>
      <Flex justifyContent="flex-end">
        <Box onClick={onClose} css={{ cursor: 'pointer' }}>
          <Cross />
        </Box>
      </Flex>
      <Grid gridRowGap="m">
        <Text.h3 textAlign="center">Connect Ledger Live or Legacy</Text.h3>

        <Grid gridRowGap="s">
          <LedgerConnectCard
            icon={<StyledLedgerLogo />}
            onClick={() => onPathSelect(LEDGER_LIVE_PATH)}
            title="Ledger live"
            subtitle={
              <BreakableText color="grey">{"m/44'/60'/0'/x"}</BreakableText>
            }
            buttonText="Connect"
          />
          <LedgerConnectCard
            icon={<StyledLedgerLogo />}
            onClick={() => onPathSelect(LEDGER_LEGACY_PATH)}
            title="Ledger legacy"
            subtitle={
              <BreakableText color="grey">{"m/44'/x'/0/0"}</BreakableText>
            }
            buttonText="Connect"
          />
        </Grid>

        <Box justifySelf="center">
          <Button variant="secondary-outline" onClick={onClose}>
            Select another wallet
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LedgerType;
