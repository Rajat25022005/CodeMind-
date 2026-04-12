import { RepoSetupModal } from '../components/RepoSetupModal';

const SetupPage = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100vw',
      background: 'var(--bg)',
    }}>
      <RepoSetupModal />
    </div>
  );
};

export default SetupPage;
