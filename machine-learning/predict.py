import pickle
import sys
import json

tree_model_filename = 'tree_model.pkl'

# Open the file to load pkl file
tree_model_pkl = open(tree_model_filename, 'rb')
tree_model = pickle.load(tree_model_pkl)

# Close the pickle instances
tree_model_pkl.close()

fare = 32.204 # train['Fare'].mean()
# Pclass  Sex   Age  SibSp  Parch     Fare  Embarked_C  Embarked_Q  Embarked_S
_, pclass, sex, age, sibsp, parch, fare, embarked, *others = sys.argv
sex = 0 if sex == 'M' else 1
(embarked_C, embarked_Q, embarked_S) = (1, 0, 0) if embarked == 'C' else (0,1,0) if embarked == 'Q' else (0,0,1)

# print(f'PClass: {pclass}, Sex: {sex}, Age: {age}, SibSp: {sibsp}, Parch: {parch}, Fare: {fare}, Embarked_C: {embarked_C}, Embarked_Q: {embarked_Q}, Embarked_S: {embarked_S}')

# personal_data = [[2, 0, 18.0, 0, 0, fare, 0, 1, 0]]
personal_data = [[pclass, sex, age, sibsp, parch, fare, embarked_C, embarked_Q, embarked_S]]
predict = tree_model.predict(personal_data)[0]
death, life = tree_model.predict_proba(personal_data)[0]
survived = True if predict == 1 else False
response = {
  "survived": survived,
  "ratios": {
    "death": death,
    "life": life
  }
}
# print(f'Vinicius: {predict} with probability {probability}')
print(json.dumps(response))