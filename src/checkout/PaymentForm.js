import React, { useContext, useCallback } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

import { styled } from '@mui/system';

import StepContext from "../context/StepContext";

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function PaymentForm() {
  const [paymentType, setPaymentType] = React.useState('creditCard');

  const { data, setData } = useContext(StepContext);
  const handleChange = useCallback((name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  }, [data, setData]);

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    let { name, value } = event.target;
    value = value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    value.length <= 16 && handleChange(name, formattedValue)
  };

  const handleCvvChange = (event) => {
    let { name, value } = event.target;
    value = value.replace(/\D/g, '');
    value.length <= 3 && handleChange(name, value)
  };

  const handleExpirationDateChange = (event) => {
    let { name, value } = event.target;
    value = value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/');
    value.length <= 4 && handleChange(name, formattedValue)
  };

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          aria-label="Payment options"
          name="paymentType"
          value={paymentType}
          onChange={handlePaymentTypeChange}
          sx={{
            flexDirection: { sm: 'column', md: 'row' },
            gap: 2,
          }}
        >
          <Card
            raised={paymentType === 'creditCard'}
            sx={{
              maxWidth: { sm: '100%', md: '50%' },
              flexGrow: 1,
              outline: '1px solid',
              outlineColor:
                paymentType === 'creditCard' ? 'primary.main' : 'divider',
              backgroundColor:
                paymentType === 'creditCard' ? 'background.default' : '',
            }}
          >
            <CardActionArea onClick={() => setPaymentType('creditCard')}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CreditCardRoundedIcon color="primary" fontSize="small" />
                <Typography fontWeight="medium">Card</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card
            raised={paymentType === 'bankTransfer'}
            sx={{
              maxWidth: { sm: '100%', md: '50%' },
              flexGrow: 1,
              outline: '1px solid',
              outlineColor:
                paymentType === 'bankTransfer' ? 'primary.main' : 'divider',
              backgroundColor:
                paymentType === 'bankTransfer' ? 'background.default' : '',
            }}
          >
            <CardActionArea onClick={() => setPaymentType('bankTransfer')}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccountBalanceRoundedIcon color="primary" fontSize="small" />
                <Typography fontWeight="medium">Bank account</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </RadioGroup>
      </FormControl>
      {paymentType === 'creditCard' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 3,
              height: { xs: 300, sm: 350, md: 375 },
              width: '100%',
              borderRadius: '20px',
              border: '1px solid ',
              borderColor: 'divider',
              backgroundColor: 'background.paper',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2">Credit card</Typography>
              <CreditCardRoundedIcon sx={{ color: 'text.secondary' }} />
            </Box>
            <SimCardRoundedIcon
              sx={{
                fontSize: { xs: 48, sm: 56 },
                transform: 'rotate(90deg)',
                color: 'text.secondary',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                gap: 2,
              }}
            >
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="cardNumber" required>
                  Card number
                </FormLabel>
                <OutlinedInput
                  id="cardNumber"
                  name="cardNumber"
                  autoComplete="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  required
                  value={data.cardNumber}
                  onChange={handleCardNumberChange}
                />
              </FormGrid>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormGrid >
                <FormLabel htmlFor="cvv" required>
                  CVV
                </FormLabel>
                <OutlinedInput
                  id="cvv"
                  name="cvv"
                  autoComplete="CVV"
                  placeholder="123"
                  required
                  value={data.cvv}
                  onChange={handleCvvChange}
                />
              </FormGrid>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="cardExpiration" required>
                  Expiration date
                </FormLabel>
                <OutlinedInput
                  id="cardExpiration"
                  name="cardExpiration"
                  autoComplete="card-expiration"
                  placeholder="MM/YY"
                  required
                  value={data.cardExpiration}
                  onChange={handleExpirationDateChange}
                />
              </FormGrid>
            </Box>
          </Box>
          <FormControlLabel
            control={<Checkbox name="saveCard" />}
            label="Remember credit card details for next time"
          />
        </Box>
      )}

      {paymentType === 'bankTransfer' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Alert severity="warning" icon={<WarningRoundedIcon />}>
            Your order will be processed once we receive the funds.
          </Alert>
          <Typography variant="subtitle1" fontWeight="medium">
            Bank account
          </Typography>
          <Typography variant="body1" gutterBottom>
            Please transfer the payment to the bank account details shown below.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" color="text.secondary">
              Bank:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              高利貸銀行
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" color="text.secondary">
              Account number:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              123456789
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" color="text.secondary">
              匯款附言:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {data.address} {data.name}
            </Typography>
          </Box>
        </Box>
      )}
    </Stack>
  );
}
