export function toast(message: string, duration: number, color?: string) {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.duration = duration;

    if(color) toast.color = color;

    document.body.append(toast);
    return toast.present()
}