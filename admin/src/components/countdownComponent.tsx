import React, { useEffect, useState } from 'react'
import LoaderIcon from './LoaderIcon'
import {getTrad} from '../utils/getTrad'
import {useIntl} from 'react-intl'
import {Box} from '@strapi/design-system'


interface CountdownProps {
  expiryDate: Date;
  onExpire?: () => void;
}

export const CountdownComponent: React.FC<CountdownProps> = ({ expiryDate, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(expiryDate));
  const {formatMessage} = useIntl()

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(expiryDate);
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.total <= 0) {
        clearInterval(timer)
        onExpire?.()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [expiryDate, onExpire])

  function calculateTimeLeft(targetDate: Date) {
    const difference = targetDate.getTime() - new Date().getTime();
    return {
      total: difference,
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  if (timeLeft.total <= 0) {
    return "Expired"
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <LoaderIcon size={25} primaryColor="#4945FF" secondaryColor="#666" lineWidth={8}/>
      <Box marginLeft={2} lineHeight={"25px"} display="flex" alignItems="center">
        {formatMessage({
          id: getTrad('protected-preview.countdown.expires-in'),
          defaultMessage: 'The link will expire in:',
        })}
      </Box>
      <Box lineHeight={"25px"} isplay="flex" alignItems="center">
        {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
      </Box>
    </Box>
  )
}
