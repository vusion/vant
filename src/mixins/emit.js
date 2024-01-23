
export const EmitMixin = {
  methods: {
    emit(...args) {
      this.$emit(...args);
    },
    emitPrevent(name, ...args) {
      let cancel = false;
      const event = {
        preventDefault: () => {
          cancel = true;
        }
      }

      const listeners = this.$listeners[name];
      if (listeners) {
        if (Array.isArray(listeners)) {
          listeners.forEach((listener) => {
            listener(event, ...args);
          });
        } else {
          listeners(event, ...args);
        }
      }

      return cancel;
    }
  }
}
