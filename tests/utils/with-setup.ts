import { createApp } from 'vue';

export const withSetup = (composable: () => any) => {
  let result: any;

  // createApp es una funcion que crea una instancia de Vue
  const app = createApp({
    // los composables se ejecutan en el setup porque es donde se ejecutan los hooks
    // y necesitan estar dentro de un componente y tener acceso al ciclo de vida de un componente.
    // Requieren el contexto de reactividad de Vue
    setup() {
      result = composable();
      return () => {};
    },
  });

  app.mount(document.createElement('div'));
  return [result, app] as const;
};
