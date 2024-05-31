import { useCallback, useContext } from 'react';

import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

import StepContext from "../context/StepContext";

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {
  const { data, setData } = useContext(StepContext);
  // console.log("data" , data);
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }, [data, setData]);

  return (
    <Grid container spacing={3}>
      <FormGrid item xs={10}>
        <FormLabel htmlFor="name" required>
          Name
        </FormLabel>
        <OutlinedInput
          id="name"
          name="name"
          type="name"
          placeholder="your name"
          onChange={handleChange}
          value={data.name}
          required
        />
      </FormGrid>
      <FormGrid item xs={10}>
        <FormLabel htmlFor="password" required>
          Password
        </FormLabel>
        <OutlinedInput
          id="password"
          name="password"
          type="password"
          placeholder="1~12 A~Z a~z"
          onChange={handleChange}
          value={data.password}
          required
        />
      </FormGrid>
      <FormGrid item xs={10}>
        <FormLabel htmlFor="address" required>
          Address line
        </FormLabel>
        <OutlinedInput
          id="address"
          name="address"
          type="address"
          placeholder="mail address"
          onChange={handleChange}
          value={data.address}
          required
        />
      </FormGrid>
      {/* <FormGrid item xs={12}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" value="yes" />}
          label="Use this address for payment details"
        />
      </FormGrid> */}
    </Grid>
  );
}
