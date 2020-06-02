export const mapLanguageKeys = function (keys) {
    let computed = {}

    for (let computedPropertyName in keys) {
        computed[computedPropertyName] = function mappedLanguageKey () {
            return this.$ml.with('VueJS').get(keys[computedPropertyName])
        }
    }

    return computed
}