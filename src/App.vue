<template>
    <div id="app">
        <nav>
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
        </nav>

        <div id="tracker" class="tracker-container">
            <div id="collectables" class="collectables-container">
                <div id="upgrades" class="upgrade-container">
                    <Item
                        v-for="item in trackerState.upgrades"
                        :key="item.id"
                        :item="item"
                        @itemEv="fetchData($event)"
                    />
                </div>
                <div id="partners" class="partner-container">
                    <Item
                        v-for="item in trackerState.partners"
                        :key="item.id"
                        :item="item"
                        @itemEv="fetchData($event)"
                    />
                </div>
            </div>

            <div id="blankspace"></div>

            <div id="counters" class="counter-container">
                <div>Counter: </div>
                <Counter 
                    :counter="trackerState.counters[0]"
                    @counterEv="fetchData($event)"
                />
            </div>

            <div id="blankspace"></div>

            <div id="logic" class="logic-container">
                <div>Chapter 1</div>
                <div id="ch1Check" class="logicCheck">No</div>
            </div>

            <div id="blankspace"></div>

            <div id="countables" class="countables-container">
                <CountableItem
                        v-for="item in trackerState.countables"
                        :key="item.id"
                        :item="item"
                        @itemEv="fetchData($event)"
                    />
            </div>

        </div>
    </div>
</template>

<script>
import Counter from "./components/Counter.vue";
import Item from "./components/Item.vue";
import CountableItem from "./components/CountableItem.vue"
import { trackerContent } from "./items";
import { updateLogic, updateItem, updateMap } from "./logic";
import "./app.css";

export default {
    name: "App",

    components: {
        Counter,
        Item,
        CountableItem,
    },

    data() {
        return {
            trackerState: trackerContent,
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

        localLoad() {
            this.jsonToState(localStorage.getItem("trackerBaseSave"));
        },

        localSave() {
            localStorage.setItem("trackerBaseSave", this.stateToJson());
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

        /** Loading
         * @param {string} json
         */
        jsonToState(json) {
            this.trackerState = JSON.parse(json);
            updateMap(this.trackerState);
            updateLogic();
        },

        /** Saving
         * @return {string}
         */
        stateToJson() {
            return JSON.stringify(this.trackerState, null, 4);
        },


        fetchData(data) {
            updateItem(data);
            updateLogic();
        },
    },
};
</script>

<style scoped>
nav {
    background-color: rgb(26, 26, 26);
    margin: 0;
    padding: 0;
    width: 100%;
    position: fixed;
    box-sizing: border-box;
    z-index:1;
    border-bottom: 1px solid black;
}
</style>
