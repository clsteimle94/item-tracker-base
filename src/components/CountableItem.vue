<template>
    <div class="countableItem"
        @click.prevent="toggle(false)"
        @contextmenu.prevent="toggle(true)"
    >
        <div class="grid">

            <div class="itemSlot"
                :class="{ checked: this.item.state != 0 }"
                :id="item.id"
                :style="`background-image: url('${this.item.pic}')`"
            ></div>

            <div class="countSlot"
                :id="`${item.id}counter`"
                :style="`color: ${countColor}`"
            >
                {{ this.item.state  }} / {{ this.item.max }}
            </div>

        </div>
    </div>
</template>

<script>

export default {
    name: "CountableItem",

    props: {
        item: {
            type: Object,
            required: true,
        },
    },

    computed: {
        countColor() {
            if (this.item.state >= this.item.max)
                return "PaleGreen";
            else if (this.item.state <= 0)
                return "#808080";
            return "black";
        },
    },

    methods: {
        increment() {
            this.item.state += 1;

            if (this.item.state >= this.item.max) {
                this.item.state = this.item.max;
            }
        },
        decrement() {
            this.item.state-= 1;

            if (this.item.state < 0) {
                this.item.state = 0;
            }
        },

        toggle(isRightClick = false) {
            let state = this.item.state + (isRightClick ? -1 : 1);

            if(isRightClick) this.decrement();
            else this.increment();

            if (state > this.item.max) {
                state = this.item.max;
            } else if (state < 0) {
                state = 0;
            }

            this.item.state = state;
            this.$emit("itemEv", this.item);
        },
    },
    
    mounted() {
        this.$emit("itemEv", this.item);
    },
};
</script>

<style scoped>
.countableItem {
    width: 76px;
}

div {
    background-repeat: no-repeat;
    background-position: center;    
    user-select: none;
    cursor: pointer;
}

.itemSlot.checked {
    filter: grayscale(0%);
    opacity: 1;

}

.itemSlot {
    filter: grayscale(90%);
    opacity: 0.4;
}

.countSlot {
    font-size: 10px;
    font-weight: bold;
}

.grid {
    display: grid;
    grid-template-columns: 32px 44px;
    grid-template-rows: 32px;
    line-height: 50px;
}
</style>
