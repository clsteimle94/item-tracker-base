<template>
    <div id="app">
        <div class="save-container">
            <button
                @click.prevent="localSave()"
                id="saveBtn"
                class="savebutton"
            >
                Save
            </button>
            <button
                @click.prevent="localLoad()"
                id="loadBtn"
                class="loadbutton"
            >
                Load
            </button>

            <button
                @click.prevent="downloadSave()"
                id="saveFile"
                class="downloadbutton"
            >
                Download Save
            </button>
            <input
                ref="fileInput"
                @change.prevent="uploadSave()"
                id="fileToLoad"
                class="loadedfile"
                type="file"
            />
        </div>

        <div id="tracker" class="tracker-container">
            <div id="collectables" class="collectables-container">
                <div id="upgrades" class="upgrade-container">
                    <Item
                        v-for="item in upgrades"
                        :key="item.id"
                        :item="item"
                    />
                </div>
                <div id="partners" class="partner-container">
                    <Item
                        v-for="item in partners"
                        :key="item.id"
                        :item="item"
                    />
                </div>
            </div>

            <div id="blankspace"></div>

            <div id="counters" class="counter-container">
                <div>Left/Right Click (max:10)</div>
                <Counter
                    v-for="counter in Object.keys(counters)"
                    :key="counter"
                    :id="counter"
                    :value="counters[counter]"
                    @counter="(value) => (counters[counter] = value)"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Counter from "./components/Counter.vue";
import Item from "./components/Item.vue";
import { partnerList, upgradeList } from "./items";
import "./app.css";

export default {
    name: "App",

    components: {
        Counter,
        Item,
    },

    data() {
        return {
            counters: {
                counter1: 0,
            },
            partners: partnerList,
            upgrades: upgradeList,
        };
    },

    methods: {
        /**
         * @param {string} content
         * @param {string} fileName
         * @param {string} contentType
         */
        download(content, fileName, contentType) {
            const a = document.createElement("a");
            const file = new Blob([content], { type: contentType });

            a.href = URL.createObjectURL(file);
            a.download = fileName;
            a.click();
        },

        downloadSave() {
            this.download(
                this.stateToJson(),
                "trackerBaseSave.json",
                "application/json"
            );
        },

        /**
         * @param {string} json
         */
        jsonToState(json) {
            const saveObj = JSON.parse(json);

            Object.keys(saveObj.items.partners).map((key) => {
                const item = this.partners.find((item) => item.id == key);
                item.state = saveObj.items.partners[key];
            });

            Object.keys(saveObj.items.upgrades).map((key) => {
                const item = this.upgrades.find((item) => item.id == key);
                item.state = saveObj.items.upgrades[key];
            });

            this.counters = saveObj.counters;
        },

        localLoad() {
            this.jsonToState(localStorage.getItem("trackerBaseSave"));
        },

        localSave() {
            localStorage.setItem("trackerBaseSave", this.stateToJson());
        },

        /**
         * @return {string}
         */
        stateToJson() {
            const partners = {};
            const upgrades = {};

            this.partners.map((item) => {
                partners[item.id] = item.state;
            });

            this.upgrades.map((item) => {
                upgrades[item.id] = item.state;
            });

            return JSON.stringify({
                counters: this.counters,
                items: {
                    partners,
                    upgrades,
                },
            });
        },

        uploadSave() {
            const file = this.$refs.fileInput.files[0];

            if (file != null) {
                const fileReader = new FileReader();

                fileReader.onload = (e) => {
                    const textFromFileLoaded = e.target.result;

                    this.jsonToState(textFromFileLoaded);
                };

                fileReader.readAsText(file, "UTF-8");
                this.$refs.fileInput.value = null;
            }
        },
    },
};
</script>
