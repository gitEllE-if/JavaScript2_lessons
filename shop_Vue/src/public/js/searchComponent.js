const search = {
    data() {
        return {
            searchLine: ''
        }
    },
    template: `<form action="#" class="search-form">
                    <input type="text" class="search-field" v-model="searchLine">
                    <button class="btn-search" type="submit" @click.prevent="$emit('filter', searchLine)">
                        <i class="fas fa-search"></i>
                    </button>
                </form>`
};

export default search;