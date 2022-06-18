<template>
    <div
        :id="id"
        class="counter"
        @click.prevent="increment()"
        @contextmenu.prevent="decrement()"
    >
        {{ value }}
    </div>
</template>

<script>
export default {
    name: "Counter",
    props: {
        id: {
            type: String,
            required: true,
        },
        deltaValue: {
            type: Number,
            default: () => 1,
        },
        max: {
            type: Number,
            default: () => 10,
        },
        value: {
            type: Number,
            required: true,
        },
    },
    methods: {
        increment() {
            let value = this.value;

            value += this.deltaValue;

            if (value > this.max) {
                value = this.max;
            }

            this.$emit("counter", value);
        },
        decrement() {
            let value = this.value;

            value -= this.deltaValue;

            if (value < 0) {
                value = 0;
            }

            this.$emit("counter", value);
        },
    },
};
</script>
