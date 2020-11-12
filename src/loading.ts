export async function createLoading(message?: string) {
    const loading = document.createElement('ion-loading');
    loading.message = message ? message : "Aguarde...";
    loading.id = "ionLoading"
    document.body.append(loading);

    return loading;
}