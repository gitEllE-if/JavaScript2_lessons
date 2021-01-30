const error = {
    props: ['isVisible'],
    template: `<div class="error-block" v-show="isVisible">
                    <div class="errorText">
                        Сервер не отвечает.<br>Повторите попытку позже
                    </div>
                    <button class="btn-error" @click="$emit('error-close')">
                        <i class="far fa-times-circle"></i>
                    </button>
                </div>`
};

export default error;