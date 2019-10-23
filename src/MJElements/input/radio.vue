<template>
  <el-radio-group v-model="currentValue" :disabled="disabled" @change="handleChange" @input="handleInput">
    <el-radio v-for="option in currentOptions" :label="option.value" :key="option.value" :border="border">{{ option.text }}</el-radio>
  </el-radio-group>
</template>

<script>
  import {
    getSysEnum
  } from '../../api/enum'

  export default {
    name: 'MjRadio',
    props: {
      value: [String,Boolean],
      mode: String,
      options: Array,
      kind: String,
      group: String,
      enumKey: String,
      visible: Number,
      sequence: Array,
      border: Boolean,
      disabled: Boolean
    },
    data() {
      return {
        currentValue: this.value || [],
        currentOptions: this.options || []
      }
    },
    watch: {
      value(val, oldVal) {
        this.setCurrentValue(val);
      },
      options(val, oldValue) {
        this.currentOptions = val;
      }
    },
    created() {
      if (!this.options) {
        if (this.kind) {
          this.getOptions(this.kind, this.group, this.enumKey, this.visible, this.sequence)
        }
      }
    },
    methods: {
      setCurrentValue(value) {
        if (value === this.currentValue) return;
        this.currentValue = value;
      },
      handleInput(value) {
        this.$emit('input', value);
        this.setCurrentValue(value);
      },
      handleChange(value) {
        this.$emit('change', value);
      },
      getOptions(kind, group, enumKey, visible, sequence) {
        const enums = this.$store.state.enums;
        if (!sequence && enums && enums[`${kind}.${group}`]) {
          this.currentOptions = enums[`${kind}.${group}`];
          return;
        }
        const binarySequence = sequence ? this.$arrayToBinary(sequence) : null;
        return getSysEnum(kind, group, enumKey, visible, binarySequence).then((response) => {
          const res = response.data;
          if (res.code === 200) {
            this.currentOptions = res.body.map(_ => ({
              text: _.displayName,
              value: _.enumKey
            }));
          }
        }, () => {})
      }
    }
  }

</script>
