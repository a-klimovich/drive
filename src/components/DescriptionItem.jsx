const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">
      <b>{title}:{' '}</b>
      {content}
    </p>
  </div>
);

export default DescriptionItem;