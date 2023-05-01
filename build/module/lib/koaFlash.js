/**
 * Registers a middleware responsible for managing flash messages.
 * You can add a generic to the call to define the types of flash messages in your app
 * @example app.use(flash<"error" | "info" | "success">())
 *
 * @note It needs a session middleware in order to work. Has been tested with koa-session
 */
const flash = () => {
    return async (ctx, next) => {
        if (!ctx.session) {
            throw new Error('Koa flash requires a session middleware to be added before');
        }
        class flash {
            /**
             * Appends the message given to the flash messages in the session of that type.
             * Creates a new array if the type isn't defined in the session flash messages.
             * @example
             * ctx.flash.setFlashMessage("info", "message sent")
             * ctx.session.flashMessages.info // now contains ["old message", "message sent"]
             * @param type the type of the flash message. picked from the generic if defined. Falls back to string
             * @param message the flash message
             */
            setFlashMessage(type, message) {
                const messagesRecord = (ctx.session.flashMessages =
                    ctx.session.flashMessages || {});
                if (messagesRecord[type]) {
                    messagesRecord[type].push(message);
                }
                else {
                    messagesRecord[type] = [message];
                }
                return messagesRecord[type].length;
            }
            /**
             * Appends multiple messages to the flash messages in the session of that type.
             * Creates a new array if the type isn't defined in the session flash messages.
             * @example
             * ctx.flash.setFlashMessages("info", ["message sent", "user created"])
             * ctx.session.flashMessages.info // now contains ["old message", "message sent", "user created"]
             * @param type the type of the flash message. picked from the generic if defined. Falls back to string
             * @param messages  the flash messages
             */
            setFlashMessages(type, messages) {
                const messagesRecord = (ctx.session.flashMessages =
                    ctx.session.flashMessages || {});
                if (!messagesRecord[type]) {
                    messagesRecord[type] = messages;
                }
                else {
                    messages.forEach((singleMessage) => {
                        messagesRecord[type].push(singleMessage);
                    });
                }
                return messagesRecord[type].length;
            }
            /**
             * Purges the given type messages from the session and returns the messages purged in an array
             * @example
             * ctx.body = { errors: ctx.flash.flash("error") } // {errors: ["upload failed", "server down"]}
             * @param type the type of the flash message. picked from the generic if defined. Falls back to string
             */
            flash(type) {
                const messagesRecord = (ctx.session.flashMessages =
                    ctx.session.flashMessages || {});
                const msgs = messagesRecord[type];
                delete messagesRecord[type];
                return msgs;
            }
            /**
             * Purges the all messages from the session and returns the messages purged in a record
             * @example
             * ctx.body = ctx.flash.flash() // { errors: ["upload failed", "server down"], info: ["internet is fast"] }
             * @param type the type of the flash message. picked from the generic if defined. Falls back to string
             */
            flashAll() {
                const messagesRecord = ctx.session.flashMessages || {};
                ctx.session.flashMessages = {};
                return messagesRecord;
            }
        }
        ctx.flash = new flash();
        return next();
    };
};
export default flash;
//# sourceMappingURL=koaFlash.js.map