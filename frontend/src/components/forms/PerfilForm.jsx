import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Card, CardContent, Typography, Divider } from '@mui/material';
import { Save, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PageLayout from "../common/PageLayout";
import { useValidationRules } from '../../hooks/useValidationRules';

const PerfilForm = () => {
const validationRules = useValidationRules();
const navigate = useNavigate();

const { control, handleSubmit, formState: { errors } } = useForm({
defaultValues: {
nome: "Roberto Souza",
matricula: "MAT001",
cpf: "123.456.789-00",
telefone: "(49) 99999-9999",
senha: ""
}
});

const onSubmit = (data) => {
console.log("Dados atualizados do perfil:", data);
navigate('/perfil');
};

const handleCancel = () => {
navigate('/perfil');
};

return (
<PageLayout title="Editar Perfil">
<Card sx={{ borderRadius: 3 }}>
<CardContent sx={{ p: 3 }}>

<Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
Dados do Perfil
</Typography>

<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
Atualize suas informações pessoais e, se desejar, altere sua senha.
</Typography>

<Divider sx={{ mb: 3 }} />

<Box component="form" onSubmit={handleSubmit(onSubmit)}>

<Controller
name="nome"
control={control}
rules={validationRules.nome}
render={({ field }) => (
<TextField
{...field}
label="Nome"
fullWidth
margin="normal"
error={!!errors.nome}
helperText={errors.nome?.message}
/>
)}
/>

<Controller
name="matricula"
control={control}
rules={validationRules.matricula}
render={({ field }) => (
<TextField
{...field}
label="Matrícula"
fullWidth
margin="normal"
disabled
error={!!errors.matricula}
helperText={errors.matricula?.message}
/>
)}
/>

<Controller
name="cpf"
control={control}
rules={validationRules.cpf}
render={({ field }) => (
<TextField
{...field}
label="CPF"
fullWidth
margin="normal"
disabled
error={!!errors.cpf}
helperText={errors.cpf?.message}
/>
)}
/>

<Controller
name="telefone"
control={control}
rules={validationRules.telefone}
render={({ field }) => (
<TextField
{...field}
label="Telefone"
fullWidth
margin="normal"
error={!!errors.telefone}
helperText={errors.telefone?.message}
/>
)}
/>

<Controller
name="senha"
control={control}
rules={validationRules.senha}
render={({ field }) => (
<TextField
{...field}
label="Nova Senha"
type="password"
fullWidth
margin="normal"
error={!!errors.senha}
helperText={errors.senha?.message || "Deixe em branco para manter a senha atual"}
/>
)}
/>

<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
<Button sx={{ mr: 1 }} onClick={handleCancel} startIcon={<ArrowBack />}>
Cancelar
</Button>

<Button type="submit" variant="contained" startIcon={<Save />}>
Salvar
</Button>
</Box>

</Box>
</CardContent>
</Card>
</PageLayout>
);
};

export default PerfilForm;