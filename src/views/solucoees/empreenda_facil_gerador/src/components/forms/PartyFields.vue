<script setup lang="ts">
import type { Parte } from "@/composables/useDocumentParties";
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/Label.vue";

/*
 * Recebe um objeto reativo (Parte) e edita seus campos in-place.
 * Padrão intencional de "form model" compartilhado — o pai é dono do objeto.
 * Por isso desabilitamos a regra de mutação de prop apenas aqui.
 */
/* eslint-disable vue/no-mutating-props */
const props = withDefaults(
  defineProps<{ modelValue: Parte; documentoLabel?: string; idPrefix?: string }>(),
  { documentoLabel: "CPF / CNPJ", idPrefix: "parte" }
);

const fieldId = (campo: string) => `${props.idPrefix}-${campo}`;
</script>

<template>
  <div class="space-y-4">
    <div class="grid gap-4 md:grid-cols-2">
      <div class="space-y-2">
        <Label :for="fieldId('nome')">Nome / Razão Social</Label>
        <Input
          :id="fieldId('nome')"
          v-model="modelValue.nome"
          placeholder="Nome completo ou empresa"
        />
      </div>
      <div class="space-y-2">
        <Label :for="fieldId('doc')">{{ documentoLabel }}</Label>
        <Input
          :id="fieldId('doc')"
          v-model="modelValue.documento"
          v-maska
          data-maska="['###.###.###-##', '##.###.###/####-##']"
          placeholder="000.000.000-00"
        />
      </div>
    </div>
    <div class="space-y-2">
      <Label :for="fieldId('endereco')">Endereço</Label>
      <Input
        :id="fieldId('endereco')"
        v-model="modelValue.endereco"
        placeholder="Rua, número, bairro, cidade - CEP"
      />
    </div>
    <div class="grid gap-4 md:grid-cols-2">
      <div class="space-y-2">
        <Label :for="fieldId('tel')">Telefone</Label>
        <Input
          :id="fieldId('tel')"
          v-model="modelValue.telefone"
          v-maska
          data-maska="['(##) ####-####', '(##) #####-####']"
          placeholder="(41) 99999-9999"
        />
      </div>
      <div class="space-y-2">
        <Label :for="fieldId('email')">E-mail</Label>
        <Input
          :id="fieldId('email')"
          v-model="modelValue.email"
          type="email"
          placeholder="contato@email.com"
        />
      </div>
    </div>
  </div>
</template>
