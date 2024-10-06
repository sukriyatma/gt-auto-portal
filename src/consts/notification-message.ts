export class NotificationMessage {
    public static readonly DISCONNECTED = new NotificationMessage("DISCONNECTED", "Your Bot Disconnected");
    public static readonly SUSPENDED = new NotificationMessage("SUSPENDED", "Your Bot Suspended");
    public static readonly FOUND_NUKED_WORLD = new NotificationMessage("FOUND_NUKED_WORLD", "Your World Found Nuked");
    public static readonly MODS_ENTERED = new NotificationMessage("MODS_ENTERED", "Mods Entered Your World");
    
    private constructor(
        public readonly type: string,
        public readonly message: string
    ) {}

    public static of(type: string) {
        const properties = Object.getOwnPropertyNames(NotificationMessage);
        for (const prop of properties) {
            const instance = (NotificationMessage as any)[prop];
            if (instance instanceof NotificationMessage && instance.type === type) {
                return instance;
            }
        }
        return null;
    }
}