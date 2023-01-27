# This Python 3 environment comes with many helpful analytics libraries installed
# It is defined by the kaggle/python Docker image: https://github.com/kaggle/docker-python
# For example, here's several helpful packages to load

import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import matplotlib.pyplot as plt
import seaborn as sns

# Show / skip plots
show_plots = False

# Input data files are available in the read-only "../input/" directory
# For example, running this (by clicking run or pressing Shift+Enter) will list all files under the input directory

import os
for dirname, _, filenames in os.walk('./input'):
  for filename in filenames:
    print(os.path.join(dirname, filename))

train = pd.read_csv('./input/train.csv')
test = pd.read_csv('./input/test.csv')

# Passengerid : Each passenger has a unique id number, so it does not affect anything in our problem.
# Survival    : Informs 1 when the passenger survived and 0 when died (target variable).
# Pclass      : Informs the class of the passenger (1 = 1st, 2 = 2nd, 3 = 3rd).
# Names       : As Passengerid, it does not have a relation with Survival, once is a unique value for each one.
# Sex         : Informs if the person is a male or female.
# Age         : Tells the age of each passenger.
# SibSp       : Total of spouses and siblings aboard the ship.
# Parch       : Total of parents and children aboard the ship.
# Ticket      : The number of the ticket, each passenger has a unique value.
# Fare        : Price of the passage.
# Cabin       : The number of the cabin of each passenger.
# Embarked    : From what port each person embarked (C = Cherbourg, Q = Queenstown, S = Southampton).

# How many lines and columns
print(f'Lines: {train.shape[0]}, Columns: {train.shape[1]}')

if show_plots:
  # See the first 5 lines
  print(train.head())

  # Identify the type of each variable
  print(train.dtypes)

  # See the percentage of missing values
  print((train.isnull().sum() / train.shape[0]).sort_values(ascending=False))

  # Statistic distribution
  print(train.describe())

  # Plot histograms
  train.hist(figsize=(10, 8))
  plt.show()

  # Plot graph of Survived vs Sex, Pclass and Embarked
  fig, (ax1, ax2, ax3) = plt.subplots(1, 3, figsize=(12, 4))

  sns.barplot(x='Sex', y='Survived', data=train, ax=ax1)
  sns.barplot(x='Pclass', y='Survived', data=train, ax=ax2)
  sns.barplot(x='Embarked', y='Survived', data=train, ax=ax3)

  plt.show()

  # See the influence of age on the probability of surviving
  age_survived = sns.FacetGrid(train, col='Survived', height=5)
  age_survived.map(sns.histplot, 'Age', kde=True)

  plt.show()

  # Plotting Age vs Pclass
  columns = ['Parch', 'SibSp', 'Age', 'Pclass']
  pd.plotting.scatter_matrix(train[columns], figsize=(15,10))

  plt.show()

  fig, axes = plt.subplots(1, 2, figsize=(15,5))

  fig.suptitle('Distribution: Age x Class', fontsize=15, y=1)
  axes[0].set_title('Age in each Class', fontsize=12)
  axes[1].set_title('Age in each Class grouped by Survived', fontsize=12)

  sns.boxplot(ax=axes[0], data=train, x='Age', y='Pclass', orient='h', width=0.65)
  sns.boxplot(ax=axes[1], data=train, x='Age', y='Pclass', hue='Survived', orient='h', width=0.65)

  plt.show()

  # Plot a heatmap to compare the variable
  sns.heatmap(data=train.corr(), annot=True, cmap='coolwarm', vmax=1.0, linewidths=1, fmt='.2f')
  plt.show()

# Save the index of the datasets to recuperate posteriously
train_idx = train.shape[0]
test_idx = test.shape[0]

# Save PassengerId for submission in Kaggle
passengerid = test['PassengerId']

# Extract the column Survived from train dataset and delete it
target = train['Survived']
train.drop(axis=1, columns='Survived', inplace=True)

# Concatenate train and test into a single dataframe
df_merged = pd.concat(objs=[train, test]).reset_index(drop=True)

print("df_merged.shape: ({} x {})".format(df_merged.shape[0], df_merged.shape[1]))

# Delete the columns [Passenger Id, Name, Ticket and Cabin]
df_merged.drop(['PassengerId', 'Name', 'Ticket', 'Cabin'], axis=1, inplace=True)
print(df_merged.head())

# See the null values
print(df_merged.isnull().sum())
print(df_merged.shape)

# Age
df_merged['Age'].fillna(df_merged['Age'].median(), inplace=True)

# Fare
df_merged['Fare'].fillna(df_merged['Fare'].median(), inplace=True)

# Embarked
df_merged['Embarked'].fillna(df_merged['Embarked'].mode(), inplace=True)

# Change the Sex column (male: 0, female: 1)
df_merged['Sex'] = df_merged['Sex'].map({'male': 0, 'female': 1})

# Transform the Embarked column into 3 columns
embarked_dummies = pd.get_dummies(df_merged['Embarked'], prefix='Embarked')
df_merged = pd.concat([df_merged, embarked_dummies], axis=1)

# Drop the old Embarked column
df_merged.drop(axis=1, columns='Embarked', inplace=True)

print(df_merged.head())

# Separating df_merged to train and test
train = df_merged.iloc[:train_idx]
test = df_merged.iloc[train_idx:]

# Import the libraries of the Machine Learning Models
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier

# Create a model of logistic regression
lr_model = LogisticRegression(solver='liblinear')
lr_model.fit(train, target)

# Verifying the model accuracy
acc_logReg = round(lr_model.score(train, target) * 100, 2)
print("The Logistic Regression Model has an accuracy of: {}%".format(acc_logReg))

# Create a model of decision tree
tree_model = DecisionTreeClassifier(max_depth=3)
tree_model.fit(train, target)

# Verifying the model accuracy
acc_tree = round(tree_model.score(train, target) * 100, 2)
print("The Decision Tree Model has an accuracy of: {}%".format(acc_tree))

# Logistic Regression
y_pred_lr = lr_model.predict(test)

submission = pd.DataFrame({
    "PassengerId": passengerid,
    "Survived": y_pred_lr
})

# generating csv file
submission.to_csv('./submission_lr.csv', index=False)

# Decision Tree
y_pred_tree = tree_model.predict(test)

submission = pd.DataFrame({
    "PassengerId": passengerid,
    "Survived": y_pred_tree
})

# gerar arquivo csv
submission.to_csv('./submission_tree.csv', index=False)


# # Using the same Decision Tree model, I will predict with my personal information if I would survive or not. Putting myself as a 2º class passenger, 18 years old, traveling on my own, paying the mean price of the ticket, and having embarked at the Queenstown port.
# personal_data = [[2, 0, 18.0, 0, 0, train['Fare'].mean(), 0, 1, 0]]

# print(f'Vinicius: {tree_model.predict(personal_data)[0]}')

# dump the trained decision tree classifier with Pickle
import pickle

tree_model_filename = 'tree_model.pkl'

# Open the file to save as pkl file
tree_model_pkl = open(tree_model_filename, 'wb')
pickle.dump(tree_model, tree_model_pkl)

# Close the pickle instances
tree_model_pkl.close()