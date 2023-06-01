import {
  Link as RouterLink,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
} from 'react-router-dom';
import Link, { LinkProps } from '@mui/material/Link';
interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}
export const LinkRouter = (props: LinkRouterProps) => {
  return <Link {...props} component={RouterLink as any} />;
}