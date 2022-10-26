function DescriptionItem({ title, content, spaceBetweenContent = false }) {
  return (
    <div className="drower-description-item-wrapper">
      <p className={`drower-description-item-p ${spaceBetweenContent ? 'flex-space-between' : ''}`}>
        <b>
          {title}
          :
          {' '}
        </b>
        {content}
      </p>
    </div>
  );
}

export default DescriptionItem;
