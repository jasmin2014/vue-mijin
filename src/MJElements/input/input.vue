<template>
  <el-input v-model="currentValue" ref="input" :class="readonly ? 'is-readonly' : ''" :readonly="readonly" :disabled="disabled" :cprop="cprop" :index="index" :outdex="outdex"
    :size="size" :type="type" :error="error" :rows="rows" :min="min" :max="max" :step="step" :placeholder="placeholder" :debounce="0"
    @input="handleInput" @focus="handleFocus" @change="handleChange" @blur="handleBlur">
    <template v-if="unit" slot="append">{{ unit }}</template>
  </el-input>
</template>

<script>
  export default {
    name: 'MjInput',
    props: {
      value: [String, Number],
      mode: String,
      unit: String,
      type: String,
      error: String,
      size: String,
      rows: Number,
      disabled: Boolean,
      min: Number,
      cprop: String,
      index: Number,
      outdex: Number,
      max: {
        type: Number,
        default: Number.MAX_SAFE_INTEGER
      },
      step: Number,
      placeholder: String
    },
    data() {
      return {
        currentValue: this.value
      }
    },
    computed: {
      readonly() {
        return this.mode === 'VIEW'
      }
    },
    watch: {
      'value' (val, oldValue) {
        this.setCurrentValue(val);
      }
    },
    mounted() {
      if (this.type === 'number') {
        const innerInput = this.$refs.input.$refs.input;
        if (innerInput) {
          innerInput.onkeypress = function (e) {
            const ev = e.which !== undefined ? e.which : window.event.keyCode;
            return /[0-9.\-]|(backspace)/i.test(e.key) || ev === 0;
          }
        }
      }
    },
    methods: {
      setCurrentValue(value) {
        if (this.type === 'number') {
          if (/^(-)?\d+\.\d*0+$/.test(value) || value === '') {
            this.currentValue = value;
          } else {
            const newValue = parseFloat(value);
            if (!isNaN(newValue)) {
              this.currentValue = value = newValue;
            } else {
              this.currentValue = value;
            }
          }
        } else {
          if (value !== this.currentValue) {
            this.currentValue = value;
          }
        }
        this.$emit('input', value);
      },
      handleInput(value) {
        this.setCurrentValue(value);
      },
      handleFocus(event) {
        this.$emit('focus', event);
      },
      handleChange() {
        this.$emit('change', this.currentValue);
      },
      handleBlur(event) {
        if (this.type === 'number') {
          if (this.currentValue) {
            if (this.error) {
              if (/^([1-9][0-9]*(\.[0-9]{1,2})?|0\.[1-9][0-9]{0,1}|0\.[0-9][1-9])$/.test(this.currentValue)) {
                this.$emit('check', this.currentValue, true);
              } else {
                this.currentValue = undefined;
                this.$emit('check', this.error, false);
              }
            } else {
              const newValue = parseFloat(this.currentValue);
              if (!isNaN(newValue)) {
                this.currentValue = newValue;
              } else if (this.currentValue !== '' && this.currentValue !== undefined && this.currentValue !== null) {
                this.currentValue = 0;
              }
              this.$emit('input', this.currentValue)
            }
          }
        } else {
          this.$emit('blur', event, this.currentValue);
        }
      }
    }
  }

</script>
