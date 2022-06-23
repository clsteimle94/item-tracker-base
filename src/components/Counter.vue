<template>
    <div
        @click.prevent="increment()"
        @contextmenu.prevent="decrement()"
        :id=this.counter.id
        class="counter"
        :style="`color: ${countColor}`"
    >
        {{ this.counter.state }} / {{ this.counter.max }}
    </div>
</template>

<script>

export default {
    name: "Counter",

    props: {
        /** @type {{ new (): Counter }} */
        counter: {
            type: Object,
            required: true,
        },

        deltaValue: {
            type: Number,
            default: () => 1,
        },
    },

    computed: {
        countColor() {
            if (this.counter.state >= this.counter.max)
                return "PaleGreen";
            else if (this.counter.state <= 0)
                return "#808080";
            return "black";
        }
    },

    methods: {
        increment() {
            this.counter.state += this.deltaValue;

            if (this.counter.state > this.counter.max) {
                this.counter.state = this.counter.max;
            }
            this.$emit("counterEv", this.counter);
        },
        decrement() {
            this.counter.state -= this.deltaValue;

            if (this.counter.state < 0) {
                this.counter.state = 0;
            }
            this.$emit("counterEv", this.counter);
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
