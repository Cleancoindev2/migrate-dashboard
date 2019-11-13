//////////////////
/// SAI to DAI ///
//////////////////

import React, { useState, useEffect } from 'react';
import { Stepper, Grid, Flex } from '@makerdao/ui-components-core';
import Router from 'next/router';
import FlowBackground from '../../components/FlowBackground';
import FlowHeader from '../../components/FlowHeader';
import useMaker from '../../hooks/useMaker';
import SCDRedeem from '../../components/migratesai/SCDRedeem';
import Confirmation from '../../components/migratesai/Confirmation';
import InProgress from '../../components/InProgress';
import Complete from '../../components/migratesai/Complete';
import FadeInFromSide from '../../components/FadeInFromSide';

const steps = [
  props => <SCDRedeem {...props} />,
  props => <Confirmation {...props} />,
  props => <InProgress {...props} title="Your Sai is being upgraded" />,
  props => <Complete {...props} />
];

function MigrateDai() {
  const { account } = useMaker();
  const [currentStep, setCurrentStep] = useState(0);
  const [migrationTxHash, setMigrationTxHash] = useState(null);

  useEffect(() => {
    if (!account) Router.replace('/');
  }, []); // eslint-disable-line

  const toPrevStepOrClose = () => {
    if (currentStep <= 0) Router.replace('/overview');
    setCurrentStep(s => s - 1);
  };
  const toNextStep = () => setCurrentStep(s => s + 1);
  const reset = () => setCurrentStep(0);

  return (
    <FlowBackground open={true}>
      <Grid gridRowGap={{ s: 's', l: 'xl' }}>
        <FlowHeader account={account} showClose={currentStep <= 1} />
        <Stepper
          steps={['Sai Upgrade', 'Confirmation']}
          selected={currentStep}
          m="0 auto"
          mt={'m'}
          p={['0 80px', '0']}
          opacity={currentStep < 1 ? 1 : 0}
          transition="opacity 0.2s"
        />

        <Flex position="relative" justifyContent="center">
          {steps.map((step, index) => {
            return (
              <FadeInFromSide
                key={index}
                active={currentStep === index}
                toLeft={index < currentStep}
                toRight={index > currentStep}
              >
                {step({
                  onClose: () => Router.replace('/overview'),
                  onPrev: toPrevStepOrClose,
                  onNext: toNextStep,
                  onReset: reset,
                  setMigrationTxHash,
                  migrationTxHash
                })}
              </FadeInFromSide>
            );
          })}
        </Flex>
      </Grid>
    </FlowBackground>
  );
}

export default MigrateDai;
