import React from 'react';

/** Props for the {@link Alert} component. */
interface AlertProps {
  /** Optional icon shown at the start of the alert. */
  icon?: React.ReactNode;
  /** Optional bold title shown above the body. */
  title?: string;
  /** Body content, typically a short message. */
  children?: React.ReactNode;
}

/**
 * Alert component — displays a styled info/notice box with an optional icon, title, and body.
 * Used across auth flows and forms to surface tips, warnings, and notices.
 */
const Alert = ({ icon, title, children }: AlertProps) => {
  return (
    <div className='bg-[#eff6ff] text-primary text-start border-1 font-medium border-[#cee3fe] border-sm p-2 md:p-4 rounded-lg flex gap-3'>
      {icon}

      <article className='space-y-1 text-xs md:text-sm'>
        <h3>{title}</h3>
        <p className='leading-4 md:leading-5'>{children}</p>
      </article>
    </div>
  );
};

export default Alert;
