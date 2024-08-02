import { SendNotificationRequest, SendNotificationType } from '@pricelooter/types';
import { ControllerRequest } from '../../types';
import { notificationService } from './notification.service';
import { ApplicationError } from '@pricelooter/exceptions';

const sendNotification = async (req: ControllerRequest<SendNotificationRequest>) => {
    const { type, data } = req.body;

    switch (type) {
        case SendNotificationType.ForgotPasswordEmail:
            return notificationService.sendForgotPasswordRequestEmail({ email: data.email });
        default:
            throw new ApplicationError({ message: `Cannot handle given operation type. (${type})` });
    }
};

export const notificationController = {
    sendNotification,
};
