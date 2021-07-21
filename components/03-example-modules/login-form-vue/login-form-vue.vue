<template>
  <div class="flex items-center justify-center min-h-full">
    <aside
      class="w-full max-w-sm p-6 m-4 transition bg-white shadow-lg  rounded-2xl hover:shadow-xl "
    >
      <h3 class="text-2xl font-bold text-center mb-e4">Login form</h3>
      <form action="#3" novalidate>
        <div class="mb-8 last:mb-0">
          <div class="relative z-10 mb-6">
            <label for="userEmail" class="hidden">User email</label>
            <input
              id="userEmail"
              type="email"
              placeholder="Email"
              v-model.trim="dataForm.userEmail"
              @input="delayTouch($v.dataForm.userEmail)"
              :class="[
                inputClasses.base,
                $v.dataForm.userEmail.$error
                  ? inputClasses.error
                  : inputClasses.default,
              ]"
            />
            <div
              class="absolute left-0 w-full pr-1 mt-1 text-xs leading-none text-right text-red-500  top-full "
            >
              <transition name="fade">
                <div v-if="$v.dataForm.userEmail.$error">
                  {{ $v.dataForm.userEmail.$errors[0].$message }}
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div class="mb-8 last:mb-0">
          <div class="relative mb-6">
            <label for="userPassword" class="hidden">User password</label>
            <input
              id="userPassword"
              type="password"
              placeholder="Password"
              v-model.trim="dataForm.userPassword"
              @input="delayTouch($v.dataForm.userPassword)"
              :class="[
                inputClasses.base,
                $v.dataForm.userPassword.$error
                  ? inputClasses.error
                  : inputClasses.default,
              ]"
            />
            <div
              class="absolute left-0 w-full pr-1 mt-1 text-xs leading-none text-right text-red-500  top-full "
            >
              <transition name="fade">
                <div v-if="$v.dataForm.userPassword.$error">
                  {{ $v.dataForm.userPassword.$errors[0].$message }}
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div class="flex justify-end mb-8 last:mb-0">
          <div class="mr-4 last:mr-0">
            <button
              :class="[bntOutlinedClasses.base, bntOutlinedClasses.default]"
            >
              Cancel
            </button>
          </div>
          <div class="mr-4 last:mr-0">
            <button
              type="submit"
              @click.prevent="sendForm"
              :class="[
                bntFillClasses.base,
                formIsSending ? bntFillClasses.loading : bntFillClasses.default,
              ]"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </aside>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import classNames from "classnames";
const classesInput = require("@components/02-inputs/input-theme1/input-theme1.config.json");
const classesFilledBtn = require("@components/01-buttons/button-filled/button-filled.config.json");
const classesOutlinedBtn = require("@components/01-buttons/button-outlined/button-outlined.config.json");
const touchMap = new WeakMap();

export default {
  setup() {
    return {
      $v: useVuelidate(),
    };
  },
  data() {
    return {
      dataForm: {
        userEmail: null,
        userPassword: null,
      },
      formIsSending: false,
    };
  },
  validations: {
    dataForm: {
      userEmail: {
        email: helpers.withMessage("Email must be valid", email),
        required: helpers.withMessage("Email is required", required),
      },
      userPassword: {
        required: helpers.withMessage("Password is required", required),
      },
    },
  },
  methods: {
    invalidCheck(prop, validator, validatorNext = null) {
      let returnValue = false;
      if (!validatorNext) {
        returnValue = this.$v.dataForm[prop][validator].$invalid;
      } else {
        returnValue =
          !this.$v.dataForm[prop][validator].$invalid &&
          this.$v.dataForm[prop][validatorNext].$invalid;
      }
      return returnValue;
    },
    delayTouch($v) {
      $v.$reset();
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }
      touchMap.set($v, setTimeout($v.$touch, 500));
    },

    resetForm() {
      let vm = this;
      vm.$v.$reset();
      for (let key in vm.dataForm) {
        vm.dataForm[key] = null;
      }
    },

    resetSendForm() {
      this.formIsSending = false;
    },

    sendForm() {
      const vm = this;
      vm.$v.$touch();

      if (!vm.$v.$invalid && !vm.formIsSending) {
        vm.formIsSending = true;

        const promiseFakeAPI = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 3000);
        });

        promiseFakeAPI.then(() => {
          vm.formSentSuccess = true;
          vm.resetForm();
          vm.resetSendForm();
        });
      }
    },
  },
  computed: {
    inputClasses() {
      return {
        base: classNames(
          classesInput.context.classes.base,
          classesInput.context.classes.size.default,
          classesInput.context.classes.theme.common
        ),
        default: classNames(classesInput.context.classes.theme.default),
        error: classNames(classesInput.context.classes.theme.error),
      };
    },
    bntFillClasses() {
      return {
        base: classNames(
          classesFilledBtn.context.classes.base,
          classesFilledBtn.context.classes.size.default,
          classesFilledBtn.context.classes.theme.common
        ),
        default: classNames(classesFilledBtn.context.classes.theme.default),
        loading: classNames(classesFilledBtn.context.classes.theme.loading),
      };
    },
    bntOutlinedClasses() {
      return {
        base: classNames(
          classesOutlinedBtn.context.classes.base,
          classesOutlinedBtn.context.classes.size.default,
          classesOutlinedBtn.context.classes.theme.common
        ),
        default: classNames(classesOutlinedBtn.context.classes.theme.default),
        loading: classNames(classesOutlinedBtn.context.classes.theme.loading),
      };
    },
  },
};
</script>
<style>
/* Animation fade for vue */
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity;
}
.fade-enter,
.fade-leave-to {
  @apply opacity-0;
}
</style>
