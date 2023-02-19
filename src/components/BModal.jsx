import { Icon } from '@iconify/react';
import { Backdrop, Modal, Fade } from '@mui/material';
import PropTypes from "prop-types";
import { VButton } from '../form';

const BModal = (props) => {

  const { open, setOpen, children, className, ...rest } = props;

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="overflow-auto"
        {...rest}
      >
        <Fade in={open}>
          <div
            className={`absolute inset-1/2 v-focus-none bg-white rounded shadow-xl overflow-auto v-light-scrollbar v-main-modal ${className}`}
            style={{ width: 'fit-content', height: 'fit-content', transform: 'translate(-50%, -50%)', maxHeight: '90%', maxWidth: '90%' }}
          >
            <VButton iconOnly className="absolute top-0 right-0 z-10" onClick={() => setOpen(false)}>
              <Icon icon="carbon:close-filled" />
            </VButton>
            {children}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

BModal.defaultProps = {
  open: false,
  setOpen: () => { },
  children: {},
  className: ''
};

BModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  children: PropTypes.any,
};

export default BModal;