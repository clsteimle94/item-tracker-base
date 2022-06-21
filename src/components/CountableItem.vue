<template>
    <div class="countableItem"
        @click.prevent="toggle(false)"
        @contextmenu.prevent="toggle(true)"
    >
        <div class="grid">
            <div class="itemSlot"
                :class="{ checked: this.item.state != 0 }"
                :id="item.id"
                :style="`background-image: url('${pic}')`"
            ></div>
            <div class="countSlot"
                :id="`${item.id}counter`"
                :style="`color: ${countColor}`"
            >
                {{ value }} / {{ this.item.count }}
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

    data() {
        return {
            value: 0
        }
    },

    computed: {
        countColor() {
            if (this.value >= this.item.count)
                return "darkgreen";
            else if (this.value <= 0)
                return "darkred";
            return "black";
        },
        
        pic() {
            return this.item.pics[0];
        },
    },

    methods: {
        increment() {
            this.value += 1;

            if (this.value >= this.item.count) {
                this.value = this.item.count;
            }
        },
        decrement() {
            this.value -= 1;

            if (this.value < 0) {
                this.value = 0;
            }
        },

        toggle(isRightClick = false) {
            let state = this.item.state + (isRightClick ? -1 : 1);

            if(isRightClick) this.decrement();
            else this.increment();

            if (state > this.item.count) {
                state = this.item.count;
            } else if (state < 0) {
                state = 0;
            }

            this.item.state = state;
        },
    },
};
</script>

<style scoped>
.countableItem {
    /* border: 2px solid red; */
    width: 70px
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
    opacity: 0.6;
}

.countSlot {
    font-size: 12px;
}

.grid {
    display: grid;
    grid-template-columns: 32px 80px;
    grid-template-rows: 32px;
    line-height: 50px;
}
</style>
