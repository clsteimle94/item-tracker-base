<template>
    <div
        :id="id"
        class="counter"
        @click.prevent="increment()"
        @contextmenu.prevent="decrement()"
        :style="`color: ${countColor}`"
    >
        {{ value }} / {{ max }}
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

    computed: {
        countColor() {
            if (this.value >= this.max)
                return "darkgreen";
            else if (this.value <= 0)
                return "darkred";
            return "black";
        }
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

<style scoped>
div {
    background: linear-gradient(
        rgba(212, 212, 212, 0.3),
        rgba(94, 94, 94, 0.3)
    );

    border-radius: 8px;
    border: 2px solid rgba(95, 95, 95, 0.7);
    user-select: none;
    cursor: pointer;
}
</style>
