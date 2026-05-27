import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageLayout from "../common/PageLayout";
import { useValidationRules } from '../../hooks/useValidationRules';

const ComandaForm = () => {
const { control, handleSubmit, formState: { errors } } = useForm();
const validationRules = useValidationRules();
const navigate = useNavigate();

const onSubmit = (data) => {
console.log("Dados da comanda:", data);
};

const handleCancel = () => {
navigate('/comandas');
};

return (
<PageLayout title="Dados Comanda">
<Box component="form" onSubmit={handleSubmit(onSubmit)}>

<Controller
name="comanda" control={control} defaultValue=""
rules={validationRules.comanda}
render={({ field }) => (
<TextField
{...field} label="Comanda" fullWidth margin="normal"
error={!!errors.comanda}
helperText={errors.comanda?.message}
/>
)}
/>

<Controller
name="status" control={control} defaultValue=""
rules={validationRules.status}
render={({ field }) => (
<TextField
{...field} select label="Status" fullWidth margin="normal"
error={!!errors.status}
helperText={errors.status?.message}
>
<MenuItem value={0}>Aberta</MenuItem>
<MenuItem value={1}>Fechada</MenuItem>
<MenuItem value={2}>Cancelada</MenuItem>
</TextField>
)}
/>

<Controller
name="cliente_id" control={control} defaultValue=""
rules={validationRules.cliente_id}
render={({ field }) => (
<TextField
{...field} label="ID Cliente" fullWidth margin="normal" type="number"
error={!!errors.cliente_id}
helperText={errors.cliente_id?.message}
/>
)}
/>

<Controller
name="funcionario_id" control={control} defaultValue=""
rules={validationRules.funcionario_id}
render={({ field }) => (
<TextField
{...field} label="ID Funcionário" fullWidth margin="normal" type="number"
error={!!errors.funcionario_id}
helperText={errors.funcionario_id?.message}
/>
)}
/>

<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
<Button sx={{ mr: 1 }} onClick={handleCancel}>
Cancelar
</Button>
<Button type="submit" variant="contained">
Cadastrar
</Button>
</Box>

</Box>
</PageLayout>
);

};

export default ComandaForm;