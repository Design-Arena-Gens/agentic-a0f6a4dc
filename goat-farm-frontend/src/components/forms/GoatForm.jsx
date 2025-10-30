import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerGoat } from '../../services/goatService';

const goatSchema = Yup.object().shape({
  tagId: Yup.string().required('Tag ID required'),
  gender: Yup.string().required('Gender required'),
  dateOfBirth: Yup.string().required('Date of birth required')
});

const GoatForm = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: registerGoat
  });

  const formik = useFormik({
    initialValues: {
      tagId: '',
      gender: 'FEMALE',
      dateOfBirth: '',
      color: '',
      farmId: 1
    },
    validationSchema: goatSchema,
    onSubmit: (values, helpers) => {
      mutation.mutate(values, {
          onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ['goats'] });
              helpers.resetForm();
              onSuccess?.();
          }
      });
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="tagId" className="text-sm font-medium text-slate-600">
          Tag ID
        </label>
        <input
          id="tagId"
          name="tagId"
          value={formik.values.tagId}
          onChange={formik.handleChange}
          className="rounded-lg border border-slate-200 px-3 py-2"
          placeholder="GF0001"
        />
        {formik.touched.tagId && formik.errors.tagId && (
          <p className="text-xs text-rose-600">{formik.errors.tagId}</p>
        )}
      </div>
      <div className="grid gap-2">
        <label htmlFor="gender" className="text-sm font-medium text-slate-600">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          className="rounded-lg border border-slate-200 px-3 py-2"
        >
          <option value="FEMALE">Female</option>
          <option value="MALE">Male</option>
        </select>
      </div>
      <div className="grid gap-2">
        <label htmlFor="dateOfBirth" className="text-sm font-medium text-slate-600">
          Date of Birth
        </label>
        <input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={formik.values.dateOfBirth}
          onChange={formik.handleChange}
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
        {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
          <p className="text-xs text-rose-600">{formik.errors.dateOfBirth}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={mutation.isLoading}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
      >
        {mutation.isLoading ? 'Saving...' : 'Register Goat'}
      </button>
    </form>
  );
};

export default GoatForm;
