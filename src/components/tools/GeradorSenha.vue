<template>
  <div class="max-w-3xl mx-auto">
    <BaseCard title="Gerador de Senha Segura" icon="fa-lock">
      <div class="space-y-6">
        <p class="text-gray-600">
          Gere senhas fortes e seguras com opções personalizáveis.
        </p>

        <div class="space-y-4">
          <BaseInput
            v-model="comprimento"
            label="Comprimento da Senha"
            type="number"
            icon="fa-ruler"
            :min="4"
            :max="64"
            @input="generatePassword"
          />

          <div class="grid md:grid-cols-2 gap-4">
            <label
              class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <input
                v-model="incluirMaiusculas"
                type="checkbox"
                class="w-5 h-5 text-primary-600"
                @change="generatePassword"
              />
              <span>Incluir Maiúsculas (A-Z)</span>
            </label>

            <label
              class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <input
                v-model="incluirMinusculas"
                type="checkbox"
                class="w-5 h-5 text-primary-600"
                @change="generatePassword"
              />
              <span>Incluir Minúsculas (a-z)</span>
            </label>

            <label
              class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <input
                v-model="incluirNumeros"
                type="checkbox"
                class="w-5 h-5 text-primary-600"
                @change="generatePassword"
              />
              <span>Incluir Números (0-9)</span>
            </label>

            <label
              class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <input
                v-model="incluirSimbolos"
                type="checkbox"
                class="w-5 h-5 text-primary-600"
                @change="generatePassword"
              />
              <span>Incluir Símbolos (!@#$%)</span>
            </label>
          </div>
        </div>

        <div v-if="senhaGerada" class="space-y-4">
          <div class="bg-gray-900 text-white rounded-xl p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-medium text-gray-400"
                >Senha Gerada:</span
              >
              <div
                :class="[
                  'px-3 py-1 rounded-full text-xs font-bold',
                  forcaClass,
                ]"
              >
                {{ forcaTexto }}
              </div>
            </div>
            <div class="flex items-center justify-between">
              <code class="text-2xl font-mono break-all">{{
                senhaGerada
              }}</code>
              <button
                @click="copiarSenha"
                class="ml-4 p-3 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
              >
                <i class="fas fa-copy"></i>
              </button>
            </div>
          </div>

          <!-- Indicador de Força -->
          <div class="space-y-2">
            <div class="flex justify-between text-sm text-gray-600 mb-1">
              <span>Força da Senha:</span>
              <span class="font-semibold">{{ forcaTexto }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div
                :class="[
                  'h-3 rounded-full transition-all duration-300',
                  forcaBarClass,
                ]"
                :style="{ width: `${forcaPorcentagem}%` }"
              ></div>
            </div>
          </div>

          <!-- Dicas de Segurança -->
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <h4 class="font-semibold text-blue-900 mb-2 flex items-center">
              <i class="fas fa-shield-alt mr-2"></i>
              Dicas de Segurança
            </h4>
            <ul class="text-sm text-blue-800 space-y-1 ml-5 list-disc">
              <li>Use senhas diferentes para cada serviço</li>
              <li>Nunca compartilhe suas senhas</li>
              <li>Ative autenticação de dois fatores quando possível</li>
              <li>Troque suas senhas regularmente</li>
            </ul>
          </div>
        </div>

        <div class="flex gap-3">
          <BaseButton
            @click="generatePassword"
            variant="primary"
            icon="fa-key"
            fullWidth
          >
            Gerar Nova Senha
          </BaseButton>
          <BaseButton
            v-if="senhaGerada"
            @click="copiarSenha"
            variant="success"
            icon="fa-copy"
          >
            Copiar
          </BaseButton>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import BaseCard from "./common/BaseCard.vue";
import BaseInput from "./common/BaseInput.vue";
import BaseButton from "./common/BaseButton.vue";
import Swal from "sweetalert2";

const comprimento = ref(16);
const incluirMaiusculas = ref(true);
const incluirMinusculas = ref(true);
const incluirNumeros = ref(true);
const incluirSimbolos = ref(true);
const senhaGerada = ref("");

const caracteres = {
  maiusculas: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  minusculas: "abcdefghijklmnopqrstuvwxyz",
  numeros: "0123456789",
  simbolos: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

const forcaSenha = computed(() => {
  if (!senhaGerada.value) return 0;

  let forca = 0;
  const senha = senhaGerada.value;

  if (senha.length >= 8) forca += 20;
  if (senha.length >= 12) forca += 20;
  if (senha.length >= 16) forca += 20;
  if (/[a-z]/.test(senha)) forca += 10;
  if (/[A-Z]/.test(senha)) forca += 10;
  if (/[0-9]/.test(senha)) forca += 10;
  if (/[^a-zA-Z0-9]/.test(senha)) forca += 10;

  return Math.min(forca, 100);
});

const forcaPorcentagem = computed(() => forcaSenha.value);

const forcaTexto = computed(() => {
  const forca = forcaSenha.value;
  if (forca < 30) return "Fraca";
  if (forca < 60) return "Média";
  if (forca < 80) return "Forte";
  return "Muito Forte";
});

const forcaClass = computed(() => {
  const forca = forcaSenha.value;
  if (forca < 30) return "bg-red-500 text-white";
  if (forca < 60) return "bg-yellow-500 text-white";
  if (forca < 80) return "bg-blue-500 text-white";
  return "bg-green-500 text-white";
});

const forcaBarClass = computed(() => {
  const forca = forcaSenha.value;
  if (forca < 30) return "bg-red-500";
  if (forca < 60) return "bg-yellow-500";
  if (forca < 80) return "bg-blue-500";
  return "bg-green-500";
});

const generatePassword = () => {
  if (
    !incluirMaiusculas.value &&
    !incluirMinusculas.value &&
    !incluirNumeros.value &&
    !incluirSimbolos.value
  ) {
    Swal.fire({
      title: "Atenção!",
      text: "Selecione pelo menos um tipo de caractere",
      icon: "warning",
      confirmButtonColor: "#3b82f6",
    });
    return;
  }

  let charset = "";
  if (incluirMaiusculas.value) charset += caracteres.maiusculas;
  if (incluirMinusculas.value) charset += caracteres.minusculas;
  if (incluirNumeros.value) charset += caracteres.numeros;
  if (incluirSimbolos.value) charset += caracteres.simbolos;

  let senha = "";
  for (let i = 0; i < comprimento.value; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    senha += charset[randomIndex];
  }

  senhaGerada.value = senha;
};

const copiarSenha = async () => {
  try {
    await navigator.clipboard.writeText(senhaGerada.value);
    Swal.fire({
      title: "Copiado!",
      text: "Senha copiada para a área de transferência",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  } catch (err) {
    Swal.fire({
      title: "Erro!",
      text: "Não foi possível copiar a senha",
      icon: "error",
      confirmButtonColor: "#3b82f6",
    });
  }
};

// Gerar senha inicial
generatePassword();
</script>
