import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

export function UnreleasedFeatureNotification() {
  const icon = <IconInfoCircle />;
  return (
    <Alert variant="light" title="System Notification" icon={icon} maw={400} color='#ce0030'>
      We are currently working on releasing this feature. We appreciate your patience and hope to notify you as soon as it is avaialble!
    </Alert>
  );
}